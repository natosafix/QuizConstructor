using Application.Updates;
using MediatR;

namespace Application.Quizzes.Commands.UpdateQuiz;

public class UpdateQuizCommand : IRequest<int>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    public List<QuestionUpdate> Questions { get; set; }
}