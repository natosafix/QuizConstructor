namespace Application.Vms;

public class QuizForUser
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public List<QuestionForUser> QuestionVms { get; set; }
}