using Application.Users.Commands.CreateUser;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

class Program
{
    public static async Task Main()
    {
        var optionsBuilder = new DbContextOptionsBuilder<QuizDbContext>();
        var options = optionsBuilder
            .UseNpgsql("User ID=postgres;Password=mypassword;Host=localhost;Database=quiz")
            .Options;


        await using (var db = new QuizDbContext(options))
        {
            var commandHandler = new CreateUserCommandHandler(db);
            await commandHandler.Handle(new CreateUserCommand
            {
                FirstName = "Artem",
                LastName = "Burdin",
                Login = "Artemable",
                Password = "HASHING PASSWORD 2.0"
            }, new CancellationToken());
            var users = db.Users.ToList();
            foreach (var u in users)
                Console.WriteLine($"{u.Id}.{u.FirstName} - {u.Login}");
        }
        Console.Read();
    }
}