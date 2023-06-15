using MediatR;

namespace Application.Questions.Commands.AddQuestion;

public class AddQuestionCommand : IRequest<int>
{
    public int TypeId { get; set; }
    public int QuizId { get; set; }
    public string Content { get; set; }
}