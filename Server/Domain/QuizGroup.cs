namespace Domain;

public class QuizGroup
{
    public int Id { get; set; }
    
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
    
    public int GroupId { get; set; }
    public Group Group { get; set; }
    
    public List<UserQuiz> UserQuizzes { get; set; } = new();
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
}