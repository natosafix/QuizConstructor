namespace Domain;

public class Quiz
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public List<UserQuiz> UserQuizzes { get; set; } = new();
    public List<Question> Questions { get; set; } = new();
    public List<QuizGroup> QuizGroups { get; set; } = new();

    public List<Group> Groups { get; set; } = new();

    public int Score { get; set; }
}