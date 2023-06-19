using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class UserQuizConfiguration : IEntityTypeConfiguration<UserQuiz>
{
    public void Configure(EntityTypeBuilder<UserQuiz> builder)
    {
        builder.HasKey(userQuiz => userQuiz.Id);

        builder.HasIndex(userQuiz => userQuiz.Id)
            .IsUnique();

        builder.Property(userQuiz => userQuiz.Id)
            .IsRequired();
        builder.Property(userQuiz => userQuiz.Score);
        builder.Property(userQuiz => userQuiz.EndTime);

        builder.HasOne(userQuiz => userQuiz.QuizGroup)
            .WithMany(quiz => quiz.UserQuizzes)
            .HasForeignKey(quiz => quiz.QuizGroupId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(userQuiz => userQuiz.User)
            .WithMany(user => user.UserQuizzes)
            .HasForeignKey(userQuiz => userQuiz.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}