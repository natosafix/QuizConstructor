using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Users.Commands.CreateUser;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Commands.CreateQuiz;

public class CreateQuizCommandHandler : RequestHandler, IRequestHandler<CreateQuizCommand, int>
{
    public CreateQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(CreateQuizCommand request, CancellationToken cancellationToken)
    {

        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.UserLogin, cancellationToken);
        
        if (user == null)
            throw new NotFoundException(nameof(User), request.UserLogin);

        var quiz = new Quiz
        {
            Name = request.Name,
            Description = request.Description,
            Creator = user
        };

        await context.Quizzes.AddAsync(quiz, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return quiz.Id;
    }
}