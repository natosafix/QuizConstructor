using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class CorrectAnswerConfiguration : IEntityTypeConfiguration<CorrectAnswer>
{
    public void Configure(EntityTypeBuilder<CorrectAnswer> builder)
    {
        builder.HasKey(correctAnswer => correctAnswer.Id);

        builder.HasIndex(correctAnswer => correctAnswer.Id)
            .IsUnique();

        builder.Property(correctAnswer => correctAnswer.Id)
            .IsRequired();
        builder.Property(correctAnswer => correctAnswer.QuestionId)
            .IsRequired();
        builder.Property(correctAnswer => correctAnswer.Content);

        builder.HasOne(correctAnswer => correctAnswer.Question)
            .WithMany(question => question.CorrectAnswers)
            .HasForeignKey(correctAnswer => correctAnswer.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}