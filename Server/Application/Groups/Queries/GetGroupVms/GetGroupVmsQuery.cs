using Application.Vms;
using MediatR;

namespace Application.Groups.Queries.GetGroupVms;

public class GetGroupVmsQuery : IRequest<GroupVmList>
{
    public string Login { get; set; }
}