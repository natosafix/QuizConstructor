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
            .Include(g => g.Admins)
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);

        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.UserLogin, cancellationToken);

        if (user == null)
            throw new NotFoundException(nameof(User), request.UserLogin);
        
        
        if (!group.Users.Contains(user) || group.Admins.All(x => x.Login != request.AdminLogin))
            throw new PermissionDeniedException();
        
        group.Users.Remove(user);

        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}