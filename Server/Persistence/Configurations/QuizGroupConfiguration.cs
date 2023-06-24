using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class QuizGroupConfiguration : IEntityTypeConfiguration<QuizGroup>
{
    public void Configure(EntityTypeBuilder<QuizGroup> builder)
    {
        builder.HasKey(quizGroup => quizGroup.Id);

        builder.HasIndex(quizGroup => quizGroup.Id)
            .IsUnique();

        builder.Property(quizGroup => quizGroup.Id)
            .IsRequired();
        builder.Property(quizGroup => quizGroup.StartTime)
            .IsRequired();
        builder.Property(quizGroup => quizGroup.EndTime)
            .IsRequired();
        
        builder.HasOne(quizGroup => quizGroup.Quiz)
            .WithMany(quiz => quiz.QuizGroups)
            .HasForeignKey(quizGroup => quizGroup.QuizId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(quizGroup => quizGroup.Group)
            .WithMany(group => group.QuizGroups)
            .HasForeignKey(quizGroup => quizGroup.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}