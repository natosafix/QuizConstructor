namespace Domain;

public class UserQuiz
{
    public int Id { get; set; }
    
    public Quiz Quiz { get; set; }
    public int QuizId { get; set; }
    
    public User User { get; set; }
    public int UserId { get; set; }

    public List<Answer> Answers { get; set; } = new();
    
    public int Score { get; set; }
    
    public DateTime EndTime { get; set; }
}