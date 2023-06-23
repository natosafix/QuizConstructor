using Application.Vms;
using MediatR;

namespace Application.Groups.Queries.GetGroupAdmins;

public class GetGroupAdminsQuery : IRequest<UserInfoList>
{
    public int GroupId { get; set; }
}