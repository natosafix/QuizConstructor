namespace Application.Vms;

public class UserQuizVm
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<UserQuestionVm>  Questions { get; set; }
}