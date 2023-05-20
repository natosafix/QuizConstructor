using MediatR;

namespace Application.Users.Commands.CreateUser;

public class CreateUserCommand : IRequest<int>
{
    public string Login { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}