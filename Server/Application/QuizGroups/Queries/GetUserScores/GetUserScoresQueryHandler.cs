using Application.Common.Abstracts;
using Application.Interfaces;
using Application.Vms;
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
            .FirstOrDefaultAsync(quizGroup => quizGroup.Id == request.Id, cancellationToken);

        return quizGroup.UserQuizzes.Select(userQuizzes => new UserScoreVm
            {
                FirstName = userQuizzes.User.FirstName,
                LastName = userQuizzes.User.LastName,
                Score = userQuizzes.Score
            })
            .ToList();

    }
}