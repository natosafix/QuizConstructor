using MediatR;

namespace Application.Groups.Commands.AddAdminInGroup;

public class AddAdminInGroupCommand : IRequest<int>
{
    public int GroupId { get; set; }
    public string Login { get; set; }
}