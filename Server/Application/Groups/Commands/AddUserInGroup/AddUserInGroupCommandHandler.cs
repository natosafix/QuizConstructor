﻿using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.AddUserInGroup;

public class AddUserInGroupCommandHandler : RequestHandler, IRequestHandler<AddUserInGroupCommand, int>
{
    public AddUserInGroupCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(AddUserInGroupCommand request, CancellationToken cancellationToken)
    {
        var group = await context.Groups
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);
        
        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (user == null)
            throw new NotFoundException(nameof(User), request.Login);
        
        group.Users.Add(user);

        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}