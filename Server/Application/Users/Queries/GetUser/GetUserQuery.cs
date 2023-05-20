using MediatR;

namespace Application.Users.Queries.GetUser;

public class GetUserQuery : IRequest<UserVm>
{
    public string Login { get; set; }
    public string Password { get; set; }
}