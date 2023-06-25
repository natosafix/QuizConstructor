using Application.Common.Abstracts;
using Application.Inputs;
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

        var userQuiz = new UserQuiz
        {
            User = user,
            EndTime = DateTime.Now,
            QuizGroup = quizGroup,
            Questions = quizGroup.Quiz.Questions.Select(question => new UserQuestion
            {
                Question = question,
                UserAnswers = request.Questions
                    .FirstOrDefault(userQuestion => userQuestion.Id == question.Id, new UserQuestionInput())
                    .Answers.Select(x => new UserAnswer
                    {
                        Content = x.Content
                    })
                    .ToList()
            })
                .ToList()
        };

        await context.UserQuizzes.AddAsync(userQuiz, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return userQuiz.Id;
    }
}