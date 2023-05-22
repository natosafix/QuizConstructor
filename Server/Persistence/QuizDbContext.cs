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
        modelBuilder
            .Entity<Group>()
            .HasMany(g => g.Quizzes)
            .WithMany(q => q.Groups)
            .UsingEntity<QuizGroup>(
                j => j
                    .HasOne(pt => pt.Quiz)
                    .WithMany(t => t.QuizGroups)
                    .HasForeignKey(pt => pt.QuizId),
                j => j
                    .HasOne(pt => pt.Group)
                    .WithMany(p => p.QuizGroups)
                    .HasForeignKey(pt => pt.GroupId),
                j =>
                {
                    j.Property(pt => pt.Duration);
                    j.Property(pt => pt.EndTime);
                    j.Property(pt => pt.StartTime);
                    j.HasKey(t => new { t.QuizId, t.GroupId });
                    j.ToTable("QuizGroup");
                });
        
        
        base.OnModelCreating(modelBuilder);
     }
}