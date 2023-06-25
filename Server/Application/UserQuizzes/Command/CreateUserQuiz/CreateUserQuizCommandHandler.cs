using Application.Common.Abstracts;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserQuizzes.Command.CreateUserQuiz;

public class CreateUserQuizCommandHandler : RequestHandler, IRequestHandler<CreateUserQuizCommand, int>
{
    public CreateUserQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(CreateUserQuizCommand request, CancellationToken cancellationToken)
    {
        var quizGroup = await context.QuizGroups
            .FirstOrDefaultAsync(quizGroup => quizGroup.Id == request.QuizGroupId, cancellationToken);

        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.UserLogin, cancellationToken);

        var userAnswers = new List<UserAnswer>();

        foreach (var userQuestion in request.Questions)
        {
            userAnswers.AddRange(userQuestion.Answers
                .Select(userAnswerInput => new UserAnswer
                {
                    Content = userAnswerInput.Content,
                    QuestionId = userQuestion.Id
                }));
        }

        var userQuiz = new UserQuiz
        {
            User = user,
            EndTime = request.Finished,
            QuizGroup = quizGroup,
            Answers = userAnswers
        };

        await context.UserQuizzes.AddAsync(userQuiz, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return userQuiz.Id;
    }
}