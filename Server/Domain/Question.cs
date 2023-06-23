namespace Domain;

public class Question
{
    public int Id { get; set; }
    
    public QuestionType Type {get;set;}
    public int QuestionTypeId { get; set; }
    
    public Quiz Quiz { get; set; }
    public int QuizId { get; set; }
    
    public string Content { get; set; }
    public int ImageId { get; set; }
    public bool Required { get; set; }
    public int Score { get; set; }
    
    public List<Answer> Answers { get; set; } = new();
    public List<CorrectAnswer> CorrectAnswers { get; set; } = new();
    
    
}