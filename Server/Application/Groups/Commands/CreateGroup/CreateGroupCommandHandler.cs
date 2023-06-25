using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.CreateGroup;

public class CreateGroupCommandHandler : RequestHandler, IRequestHandler<CreateGroupCommand, int>
{
    public CreateGroupCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
    {
        var creator = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);
        
        if (creator == null)
            throw new NotFoundException(nameof(User), request.Login);

        var group = new Group
        {
            Name = request.Name
        };
        
        group.Admins.Add(creator);
        
        await context.Groups.AddAsync(group, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}