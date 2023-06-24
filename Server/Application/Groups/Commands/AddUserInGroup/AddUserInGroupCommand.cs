using MediatR;

namespace Application.Groups.Commands.AddUserInGroup;

public class AddUserInGroupCommand : IRequest<int>
{
    public int GroupId { get; set; }
    public string Login { get; set; }
}