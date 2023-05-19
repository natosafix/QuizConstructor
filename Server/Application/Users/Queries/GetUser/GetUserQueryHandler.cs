using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUser;

public class GetUserQueryHandler : RequestHandler, IRequestHandler<GetUserQuery, UserVm>
{
    private readonly IMapper mapper;
    public GetUserQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;
    
    public async Task<UserVm> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(User), request.Login);

        if (entity.Password != request.Password)
            throw new Exception("Wrong Password");

        return mapper.Map<UserVm>(entity);
    }
}