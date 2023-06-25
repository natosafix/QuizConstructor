using Application.Vms;
using MediatR;

namespace Application.UserQuizzes.Query.GetUserQuiz;

public class GetUserQuizQuery : IRequest<UserQuizVm>
{
    public string Login { get; set; }
    public int Id { get; set; }
}