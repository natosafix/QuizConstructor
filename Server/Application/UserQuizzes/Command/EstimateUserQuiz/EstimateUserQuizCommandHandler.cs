using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
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
            .FirstOrDefaultAsync(uq => uq.Id == request.Id, cancellationToken);

        if (userQuiz == null || userQuiz.Questions == null)
            throw new NotFoundException(nameof(UserQuiz), request.Id);

        var score = 0;
        foreach (var question in userQuiz.Questions)
        {
            var pointScore = request.Points.FirstOrDefault(x => x.QuestionId == question.Id).Score;
            question.Score = pointScore;
            score += pointScore;
        }

        userQuiz.Score = score;
        await context.SaveChangesAsync(cancellationToken);
        return userQuiz.Id;
    }
}