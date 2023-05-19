using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.DeleteUser;

public class DeleteUserCommandHandler : RequestHandler, IRequestHandler<DeleteUserCommand>
{
    public DeleteUserCommandHandler(IDbContext context) : base(context) {}
    
    public async Task Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(User), request.Login);

        context.Users.Remove(entity);
        await context.SaveChangesAsync(cancellationToken);
    }
}