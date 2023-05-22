using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUserByPassword;

public class GetUserByPasswordQueryHandler : RequestHandler, IRequestHandler<GetUserByPasswordQuery, UserVm>
{
    private readonly IMapper mapper;
    public GetUserByPasswordQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;
    
    public async Task<UserVm> Handle(GetUserByPasswordQuery request, CancellationToken cancellationToken)
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