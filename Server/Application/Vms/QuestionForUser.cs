namespace Application.Vms;

public class QuestionForUser
{
    public int Id { get; set; }
    public string Content { get; set; }
    public TypeVm Type { get; set; }
    public bool Required { get; set; }
    public int MaxScore { get; set; }
    public List<Option> Options { get; set; }
}