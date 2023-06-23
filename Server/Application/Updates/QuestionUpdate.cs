namespace Application.Updates;

public class QuestionUpdate
{
    public int? Id { get; set; }
    public string Content { get; set; }
    public int TypeId { get; set; }
    public bool Required { get; set; }
    public int MaxScore { get; set; }
    
    public List<OptionUpdate> Options { get; set; }
    
    public List<OptionUpdate> CorrectOptions { get; set; }
}