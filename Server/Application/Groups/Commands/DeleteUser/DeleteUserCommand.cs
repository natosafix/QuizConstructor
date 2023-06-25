using MediatR;

namespace Application.Groups.Commands.DeleteUser;

public class DeleteUserCommand : IRequest<int>
{
    public string AdminLogin { get; set; }
    public int GroupId { get; set; }
    public string UserLogin { get; set; }
}