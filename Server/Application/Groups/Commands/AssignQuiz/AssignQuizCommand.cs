using MediatR;

namespace Application.Groups.Commands.AssignQuiz;

public class AssignQuizCommand : IRequest<int>
{
    public int QuizId { get; set; }
    public List<int> GroupsId { get; set; }
    
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}