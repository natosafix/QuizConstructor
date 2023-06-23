using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.DeleteUser;

public class DeleteUserCommandHandler : RequestHandler, IRequestHandler<DeleteUserCommand, int>
{
    public DeleteUserCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var group = await context.Groups
            .Include(g => g.Users)
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);

        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        var admin = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.UserLogin, cancellationToken);

        if (admin == null)
            throw new NotFoundException(nameof(User), request.UserLogin);

        group.Users.Remove(admin);

        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}