using Application.Vms;
using MediatR;

namespace Application.Quizzes.Queries.GetQuiz;

public class GetQuizQuery : IRequest<QuizView>
{
    public string Login { get; set; }
    public int Id { get; set; }
}