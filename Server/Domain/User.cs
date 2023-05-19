namespace Domain;

public class User
{
    public int Id { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public List<Group> UserGroups { get; set; } = new();
    public List<Group> AdminGroups { get; set; } = new();

    public List<UserQuiz> UserQuizzes { get; set; } = new();
}