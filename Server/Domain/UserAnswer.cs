namespace Domain;

public class UserAnswer
{
    public int Id { get; set; }
    public string Content { get; set; }
    
    public UserQuestion UserQuestion { get; set; }
    public int QuestionId { get; set; }
}