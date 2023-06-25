namespace Domain;

public class Group
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<User> Users { get; set; } = new();
    public List<User> Admins { get; set; } = new();
    public List<QuizGroup> QuizGroups { get; set; } = new();

}