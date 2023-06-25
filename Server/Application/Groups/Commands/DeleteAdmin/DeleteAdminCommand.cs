using MediatR;

namespace Application.Groups.Commands.DeleteAdmin;

public class DeleteAdminCommand : IRequest<int>
{
    public int GroupId { get; set; }
    public string AdminLogin { get; set; }
}