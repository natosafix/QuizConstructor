namespace Domain;

public class UserQuestion
{
    public int Id { get; set; }
    
    public List<UserAnswer> UserAnswers { get; set; }
    
    public Question Question { get; set; }
    public int QuestionId { get; set; }
    
    public UserQuiz UserQuiz { get; set; }
    public int UserQuizId { get; set; }
    
    public int Score { get; set; }
}