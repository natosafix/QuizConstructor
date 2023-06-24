namespace Domain;

public class UserAnswer
{
    public int Id { get; set; }
    public string Content { get; set; }
    
    public Question Question { get; set; }
    public int QuestionId { get; set; }
    
    public UserQuiz UserQuiz { get; set; }
    public int UserQuizId { get; set; }
}