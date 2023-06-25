using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Commands.Delete;

public class DeleteCommandHandler : RequestHandler, IRequestHandler<DeleteCommand, int>
{
    public DeleteCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var group = await context.Groups
            .Include(group => group.Admins)
            .FirstOrDefaultAsync(group => group.Id == request.Id, cancellationToken);

        if (group == null)
            throw new NotFoundException(nameof(Group), request.Id);
        

        if (group.Admins.Any(x => x.Login != request.Login))
            throw new PermissionDeniedException();
        
        context.Groups.Remove(group);
        await context.SaveChangesAsync(cancellationToken);

        return group.Id;
    }
}