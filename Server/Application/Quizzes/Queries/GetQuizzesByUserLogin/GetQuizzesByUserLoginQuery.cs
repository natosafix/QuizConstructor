using Application.Quizzes.Queries.GetQuiz;
using MediatR;

namespace Application.Quizzes.Queries.GetQuizzesByUserLogin;

public class GetQuizzesByUserLoginQuery : IRequest<QuizListVm>
{
    public string Login { get; set; }
}