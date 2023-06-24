using MediatR;

namespace Application.QuestionTypes.Commands.AddQuestionType;

public class AddQuestionTypeCommand : IRequest<int>
{
    public string Name { get; set; }
}