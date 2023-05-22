using Application.Vms;
using MediatR;

namespace Application.Users.Queries.GetUserByPassword;

public class GetUserByPasswordQuery : IRequest<UserVm>
{
    public string Login { get; set; }
    public string Password { get; set; }
}