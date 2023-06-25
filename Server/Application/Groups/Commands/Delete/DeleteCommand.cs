using MediatR;

namespace Application.Groups.Commands.Delete;

public class DeleteCommand : IRequest<int>
{
    public int Id { get; set; }
}