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
        var group = await context.Groups
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);
        
        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        var quiz = await context.Quizzes
            .FirstOrDefaultAsync(quiz => quiz.Id == request.QuizId, cancellationToken);
        
        if (quiz == null)
            throw new NotFoundException(nameof(Quiz), request.QuizId);

        var quizGroup = new QuizGroup
        {
            Quiz = quiz,
            Group = group,
            StartTime = request.StartTime,
            EndTime = request.EndTime
        };
        
        group.QuizGroups.Add(quizGroup);
        await context.SaveChangesAsync(cancellationToken);
        return 1;
    }
}