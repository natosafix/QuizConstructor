using Domain;
using MediatR;

namespace Application.Quizzes.Commands.CreateQuiz;

public class CreateQuizCommand : IRequest<int>
{
    public string UserLogin { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}