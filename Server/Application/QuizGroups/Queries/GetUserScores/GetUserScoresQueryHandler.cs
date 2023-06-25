using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.QuizGroups.Queries.GetUserScores;

public class GetUserScoresQueryHandler : RequestHandler, IRequestHandler<GetUserScoresQuery, List<UserScoreVm>>
{
    public GetUserScoresQueryHandler(IDbContext context) : base(context) { }

    public async Task<List<UserScoreVm>> Handle(GetUserScoresQuery request, CancellationToken cancellationToken)
    {
        var quizGroup = await context.QuizGroups
            .Include(quizGroup => quizGroup.UserQuizzes)
                .ThenInclude(userQuizzes => userQuizzes.User)
            .Include(qg => qg.Group)
            .ThenInclude(g => g.Admins)
            .FirstOrDefaultAsync(quizGroup => quizGroup.Id == request.Id, cancellationToken);

        if (quizGroup == null)
            throw new NotFoundException(nameof(QuizGroup), request.Id);

        if (quizGroup.Group.Admins.All(x => x.Login != request.Login))
            throw new PermissionDeniedException();
        
        return quizGroup.UserQuizzes.Select(userQuizzes => new UserScoreVm
            {
                Name = $"{userQuizzes.User.FirstName} {userQuizzes.User.LastName}",
                AnswerId = userQuizzes.Id,
                Score = userQuizzes.Score
            })
            .ToList();
    }
}