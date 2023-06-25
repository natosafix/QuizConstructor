using Application.Vms;
using MediatR;

namespace Application.Groups.Queries.GetGroupsInfo;

public class GetGroupsInfoQuery : IRequest<GroupListInfo>
{
    public string Login { get; set; }
}