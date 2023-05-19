namespace Domain;

public class QuestionType
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public List<Question> Questions { get; set; } = new();
}