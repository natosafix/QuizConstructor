namespace Domain;

public class UserQuiz
{
    public int Id { get; set; }
    
    public QuizGroup QuizGroup { get; set; }
    public int QuizGroupId { get; set; }
    
    public User User { get; set; }
    public int UserId { get; set; }

    public List<Answer> Answers { get; set; } = new();
    
    public int Score { get; set; }
    
    public DateTime EndTime { get; set; }
}