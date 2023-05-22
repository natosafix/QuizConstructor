using Application.Quizzes.Queries.GetQuiz;
using MediatR;

namespace Application.Quizzes.Queries.GetQuizzesByUserLogin;

public class QuizListVm
{
    public IList<QuizVm> QuizVms { get; set; }
}