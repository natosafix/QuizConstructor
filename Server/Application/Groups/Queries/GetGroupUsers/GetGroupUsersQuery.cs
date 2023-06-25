using Application.Vms;
using MediatR;

namespace Application.Groups.Queries.GetGroupUsers;

public class GetGroupUsersQuery : IRequest<UserInfoList>
{
    public string Login { get; set; }
    public int GroupId { get; set; }
}