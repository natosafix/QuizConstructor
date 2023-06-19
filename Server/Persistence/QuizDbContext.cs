using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Configurations;

namespace Persistence;

public class QuizDbContext : DbContext, IDbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<CorrectAnswer> CorrectAnswers { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionType> QuestionTypes { get; set; }
    public DbSet<UserQuiz> UserQuizzes { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }

    public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AnswerConfiguration());
        modelBuilder.ApplyConfiguration(new CorrectAnswerConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new QuestionConfiguration());
        modelBuilder.ApplyConfiguration(new QuizConfiguration());
        modelBuilder.ApplyConfiguration(new UserQuizConfiguration());
        modelBuilder.ApplyConfiguration(new QuestionTypeConfiguration());
        modelBuilder.ApplyConfiguration(new GroupConfiguration());
        modelBuilder.ApplyConfiguration(new QuizGroupConfiguration());

        base.OnModelCreating(modelBuilder);
     }
}