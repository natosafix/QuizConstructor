using Application.Users.Queries.GetUserByPassword;
using Application.Vms;
using MediatR;

namespace Application.Users.Queries.GetUserByLogin;

public class GetUserByLoginQuery : IRequest<UserVm>
{
    public string Login { get; set; }
}