using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.AssignQuiz;

public class AssignQuizCommandHandler : RequestHandler, IRequestHandler<AssignQuizCommand, int>
{
    public AssignQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(AssignQuizCommand request, CancellationToken cancellationToken)
    {
        var groups = await context.Groups
            .Include(g => g.Admins)
            .Where(group => request.GroupsId.Contains(group.Id))
            .ToListAsync(cancellationToken);
        
        if (groups == null)
            throw new NotFoundException(nameof(Group), request.GroupsId);

        var quiz = await context.Quizzes
            .Include(q => q.Creator)
            .FirstOrDefaultAsync(quiz => quiz.Id == request.QuizId, cancellationToken);
        
        if (quiz == null)
            throw new NotFoundException(nameof(Quiz), request.QuizId);

        if (quiz.Creator.Login != request.Login || groups.Any(x => x.Admins.All(u => u.Login != request.Login)))
            throw new PermissionDeniedException();
        
        foreach (var group in groups)
        {
            var quizGroup = new QuizGroup
            {
                Quiz = quiz,
                Group = group,
                StartTime = request.StartTime,
                EndTime = request.EndTime
            };
            
            group.QuizGroups.Add(quizGroup);
        }
        
        await context.SaveChangesAsync(cancellationToken);
        return quiz.Id;
    }
}