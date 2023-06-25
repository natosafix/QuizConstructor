using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.AddAdminInGroup;

public class AddAdminInGroupCommandHandler : RequestHandler, IRequestHandler<AddAdminInGroupCommand, int>
{
    public AddAdminInGroupCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(AddAdminInGroupCommand request, CancellationToken cancellationToken)
    {
        var group = await context.Groups
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);
        
        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        var admin = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (admin == null)
            throw new NotFoundException(nameof(User), request.Login);
        
        group.Admins.Add(admin);

        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}