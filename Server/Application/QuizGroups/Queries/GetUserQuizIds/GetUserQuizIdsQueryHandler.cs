using Application.Common.Abstracts;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.QuizGroups.Queries.GetUserQuizIds;

public class GetUserQuizIdsQueryHandler : RequestHandler, IRequestHandler<GetUserQuizIdsQuery, List<int>>
{
    public GetUserQuizIdsQueryHandler(IDbContext context) : base(context) { }

    public async Task<List<int>> Handle(GetUserQuizIdsQuery request, CancellationToken cancellationToken)
    {
        return await context.UserQuizzes
            .Where(userQuiz => userQuiz.QuizGroupId == request.Id)
            .Select(userQuiz => userQuiz.Id)
            .ToListAsync(cancellationToken);
    }
}