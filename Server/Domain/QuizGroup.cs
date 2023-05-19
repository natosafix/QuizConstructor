namespace Domain;

public class QuizGroup
{
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; }
    
    public int GroupId { get; set; }
    public Group Group { get; set; }
    
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public int? Duration { get; set; }
}