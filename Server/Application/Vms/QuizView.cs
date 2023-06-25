namespace Application.Vms;

public class QuizView
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    public List<QuestionView> Questions { get; set; }
}