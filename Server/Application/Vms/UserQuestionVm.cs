using Domain;

namespace Application.Vms;

public class UserQuestionVm
{
    public int Score { get; set; }
    public List<UserAnswerVm> Answers { get; set; }
}