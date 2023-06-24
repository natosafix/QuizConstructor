namespace Domain;

public class Answer
{
    public int Id { get; set; }
    public string Content { get; set; }
    
    public Question Question { get; set; }
    public int QuestionId { get; set; }
}