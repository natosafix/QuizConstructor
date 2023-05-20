using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.HasKey(question => question.Id);

        builder.HasIndex(question => question.Id)
            .IsUnique();

        builder.Property(question => question.Id)
            .IsRequired();
        builder.Property(question => question.Score);
        builder.Property(question => question.Content);
        builder.Property(question => question.QuestionTypeId)
            .IsRequired();
        builder.Property(question => question.QuizId)
            .IsRequired();

        builder.HasOne(question => question.Quiz)
            .WithMany(quiz => quiz.Questions)
            .HasForeignKey(question => question.QuizId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(question => question.Type)
            .WithMany(type => type.Questions)
            .HasForeignKey(question => question.QuestionTypeId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}