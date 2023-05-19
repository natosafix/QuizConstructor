using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.ChangeUserPassword;

public class ChangeUserPasswordCommandHandler : RequestHandler, IRequestHandler<ChangeUserPasswordCommand, Unit>
{
    public ChangeUserPasswordCommandHandler(IDbContext context) : base(context) {}

    public async Task<Unit> Handle(ChangeUserPasswordCommand request, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(User), request.Login);

        entity.Password = request.NewPassword;
        
        await context.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}