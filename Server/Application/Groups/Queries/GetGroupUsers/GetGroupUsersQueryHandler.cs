using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Queries.GetGroupUsers;

public class GetGroupUsersQueryHandler : RequestHandler, IRequestHandler<GetGroupUsersQuery, UserInfoList>
{
    private readonly IMapper mapper;
    public GetGroupUsersQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;

    public async Task<UserInfoList> Handle(GetGroupUsersQuery request, CancellationToken cancellationToken)
    {
        var group = await context.Groups
            .Include(group => group.Users)
            .FirstOrDefaultAsync(group => group.Id == request.GroupId, cancellationToken);

        if (group == null)
            throw new NotFoundException(nameof(Group), request.GroupId);

        return mapper.Map<UserInfoList>(group.Users);
    }
}