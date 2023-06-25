using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.QuizGroups.Queries.GetUserQuizIds;

public class GetUserQuizIdsQueryHandler : RequestHandler, IRequestHandler<GetUserQuizIdsQuery, List<int>>
{
    public GetUserQuizIdsQueryHandler(IDbContext context) : base(context) { }

    public async Task<List<int>> Handle(GetUserQuizIdsQuery request, CancellationToken cancellationToken)
    {
        var quizGroup = await context.QuizGroups
            .Include(qg => qg.UserQuizzes)
            .Include(qg => qg.Group)
            .ThenInclude(g => g.Admins)
            .FirstOrDefaultAsync(uq => uq.Id == request.Id, cancellationToken);

        if (quizGroup == null)
            throw new NotFoundException(nameof(QuizGroup), request.Id);

        if (quizGroup.Group.Admins.All(x => x.Login != request.Login))
            throw new PermissionDeniedException();
        
        return quizGroup.UserQuizzes
            .Select(userQuiz => userQuiz.Id)
            .ToList();
    }
}