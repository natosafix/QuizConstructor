using MediatR;

namespace Application.Groups.Commands.CreateGroup;

public class CreateGroupCommand : IRequest<int>
{
    public string Name { get; set; }
    
    public string Login { get; set; }
}