namespace Application.Vms;

public class QuestionView
{
    public int Id { get; set; }
    public int TypeId { get; set; }
    public int MaxScore { get; set; }
    public bool Required { get; set; }
    
    public List<OptionView> Options { get; set; }
    public List<OptionView> CorrectOptions { get; set; }
}