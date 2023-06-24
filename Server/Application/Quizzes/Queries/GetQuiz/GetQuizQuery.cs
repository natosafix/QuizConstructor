using Application.Vms;
using MediatR;

namespace Application.Quizzes.Queries.GetQuiz;

public class GetQuizQuery : IRequest<QuizVm>
{
    public int Id { get; set; }
}