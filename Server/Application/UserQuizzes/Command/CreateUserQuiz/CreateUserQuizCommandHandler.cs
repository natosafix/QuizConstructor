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

        var k = request.Questions.SelectMany(x => x.Answers)
            .Select(x => new UserAnswer
            {
                Content = x.Content,
                QuestionId = 
            });
        
        var userQuiz = new UserQuiz
        {
            User = user,
            EndTime = request.Finished,
            QuizGroup = quizGroup,
        }
    }
}