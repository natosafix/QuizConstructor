namespace Application.Inputs;

public class QuestionInput
{
    public string Content { get; set; }
    public int TypeId { get; set; }
    public bool Required { get; set; }
    public int MaxScore { get; set; }
    
    public List<OptionInput> Options { get; set; }
    
    public List<OptionInput> CorrectOptions { get; set; }
}