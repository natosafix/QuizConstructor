using Application.Inputs;
using MediatR;

namespace Application.UserQuizzes.Command.CreateUserQuiz;

public class CreateUserQuizCommand : IRequest<int>
{
    public int QuizGroupId { get; set; }
    public string UserLogin { get; set; }
    
    public List<UserQuestionInput> Questions { get; set; }
}