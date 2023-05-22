using Application.Users.Queries.GetUserByPassword;
using MediatR;

namespace Application.Users.Queries.GetUserByLogin;

public class GetUserByLogin : IRequest<UserVm>
{
    public string Login { get; set; }
}