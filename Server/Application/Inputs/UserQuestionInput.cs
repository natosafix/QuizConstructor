using Domain;

namespace Application.Inputs;

public class UserQuestionInput
{
    public int Id { get; set; }
    public List<UserAnswerInput> Answers { get; set; }
    
}