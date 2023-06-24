using Application.Inputs;
using MediatR;

namespace Application.Quizzes.Commands.CreateQuiz;

public class CreateQuizCommand : IRequest<int>
{
    public string Login { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    public List<QuestionInput> Questions { get; set; }
}