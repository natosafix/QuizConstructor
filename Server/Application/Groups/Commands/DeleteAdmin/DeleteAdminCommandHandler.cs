using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.DeleteAdmin;

public class DeleteAdminCommandHandler : RequestHandler, IRequestHandler<DeleteAdminCommand, int>
{
    public DeleteAdminCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(DeleteAdminCommand request, CancellationToken cancellationToken)
    {
        var group = await context.Groups
            .Include(g => g.Admins)
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);

        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        var admin = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.AdminLogin, cancellationToken);

        if (admin == null)
            throw new NotFoundException(nameof(User), request.AdminLogin);

        group.Admins.Remove(admin);

        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}