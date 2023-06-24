namespace Application.Vms;

public class QuestionVm
{
    public int Id { get; set; }
    public string Content { get; set; }
    public TypeVm TypeVm { get; set; }
    public bool Required { get; set; }
    public int MaxScore { get; set; }
    public List<Option> Options { get; set; }
    
    public List<Option> CorrectOptions { get; set; }
    
    public bool IsAutoCheck { get; set; }
}