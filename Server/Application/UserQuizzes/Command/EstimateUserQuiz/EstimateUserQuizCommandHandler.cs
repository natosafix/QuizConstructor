using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserQuizzes.Command.EstimateUserQuiz;

public class EstimateUserQuizCommandHandler : RequestHandler, IRequestHandler<EstimateUserQuizCommand, int>
{
    public EstimateUserQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(EstimateUserQuizCommand request, CancellationToken cancellationToken)
    {
        var userQuiz = await context.UserQuizzes
            .Include(uq => uq.Questions)
            .Include(uq => uq.QuizGroup)
            .ThenInclude(qg => qg.Group)
            .ThenInclude(g => g.Admins)
            .FirstOrDefaultAsync(uq => uq.Id == request.Id, cancellationToken);

        if (userQuiz?.Questions == null)
            throw new NotFoundException(nameof(UserQuiz), request.Id);

        if (userQuiz.QuizGroup.Group.Admins.All(x => x.Login != request.Login))
            throw new PermissionDeniedException();
        
        var score = 0;
        foreach (var question in userQuiz.Questions)
        {
            var pointScore = request.Points.FirstOrDefault(x => x.QuestionId == question.QuestionId, new Point{Score = 0}).Score;
            question.Score = pointScore;
            score += pointScore;
        }

        userQuiz.Score = score;
        await context.SaveChangesAsync(cancellationToken);
        return userQuiz.Id;
    }
}