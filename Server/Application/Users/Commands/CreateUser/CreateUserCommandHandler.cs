using Application.Common.Abstracts;
using Application.Interfaces;
using Domain;
using MediatR;

namespace Application.Users.Commands.CreateUser;

public class CreateUserCommandHandler : RequestHandler, IRequestHandler<CreateUserCommand, int>
{
    public CreateUserCommandHandler(IDbContext context) : base(context) {}

    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            Login = request.Login,
            Password = request.Password,
            FirstName = request.FirstName,
            LastName = request.LastName
        };

        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return user.Id;
    }
}