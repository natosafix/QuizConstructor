using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Groups.Queries.GetGroupsInfo;
using Application.Interfaces;
using Application.Vms;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Groups.Queries.GetGroup;

public class GetGroupsInfoQueryHandler : RequestHandler, IRequestHandler<GetGroupsInfoQuery, GroupListInfo>
{
    private readonly IMapper mapper;
    
    public GetGroupsInfoQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;

    public async Task<GroupListInfo> Handle(GetGroupsInfoQuery request, CancellationToken cancellationToken)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (user == null)
            throw new NotFoundException(nameof(User), request.Login);

        var groups = await context.Groups
            .Where(group => group.Admins.Contains(user))
            .ProjectTo<GroupInfo>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new GroupListInfo {GroupInfos = groups};
    }
}