using Application.Vms;
using MediatR;

namespace Application.Groups.Queries.GetGroupUsers;

public class GetGroupUsersQuery : IRequest<UserInfoList>
{
    public int GroupId { get; set; }
}