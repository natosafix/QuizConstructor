namespace Application.Vms;

public class UserQuizVm
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public List<UserQuestionVm>  Questions { get; set; }
}