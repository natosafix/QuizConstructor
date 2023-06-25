using MediatR;

namespace Application.Groups.Commands.Delete;

public class DeleteCommand : IRequest<int>
{
    public string Login { get; set; }
    public int Id { get; set; }
}