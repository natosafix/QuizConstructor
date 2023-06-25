using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserQuizzes.Query.GetUserQuiz;

public class GetUserQuizQueryHandler : RequestHandler, IRequestHandler<GetUserQuizQuery, UserQuizVm>
{
    public GetUserQuizQueryHandler(IDbContext context) : base(context) { }

    public async Task<UserQuizVm> Handle(GetUserQuizQuery request, CancellationToken cancellationToken)
    {
        var userQuiz =
            await context.UserQuizzes
                .Include(userQuiz => userQuiz.Questions)
                    .ThenInclude(question => question.UserAnswers)
                .Include(quiz => quiz.User)
                .Include(q => q.QuizGroup)
                    .ThenInclude(qg => qg.Group)
                        .ThenInclude(qg => qg.Admins)
                .FirstOrDefaultAsync(userQuiz => userQuiz.Id == request.Id, cancellationToken);

        if (userQuiz == null)
            throw new NotFoundException(nameof(UserQuiz), request.Id);

        if (userQuiz.QuizGroup.Group.Admins.All(x => x.Login != request.Login))
            throw new PermissionDeniedException();
        
        return new UserQuizVm
        {
            Id = userQuiz.Id,
            Name = $"{userQuiz.User.FirstName} {userQuiz.User.LastName}",
            Questions = userQuiz.Questions.Select(question => new UserQuestionVm
                {
                    Score = question.Score,
                    Answers = question.UserAnswers.Select(userAnswer => new UserAnswerVm
                    {
                        Id = userAnswer.Id,
                        Content = userAnswer.Content
                    })
                        .ToList()
                })
                .ToList()
        };
    }
}