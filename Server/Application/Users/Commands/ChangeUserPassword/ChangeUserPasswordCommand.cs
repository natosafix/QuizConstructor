using MediatR;

namespace Application.Users.Commands.ChangeUserPassword;

public class ChangeUserPasswordCommand : IRequest<Unit>
{
    public string Login { get; set; }
    public string NewPassword { get; set; }
}