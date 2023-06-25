using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class UserAnswerConfiguration : IEntityTypeConfiguration<UserAnswer>
{
    public void Configure(EntityTypeBuilder<UserAnswer> builder)
    {
        builder.HasKey(answer =>  answer.Id);

        builder.HasIndex(answer => answer.Id)
            .IsUnique();

        builder.Property(answer => answer.Id)
            .IsRequired();
        builder.Property(answer => answer.Content)
            .IsRequired();
        builder.Property(answer => answer.QuestionId)
            .IsRequired();

        builder.HasOne(userAnswer => userAnswer.UserQuestion)
            .WithMany(userQuiz => userQuiz.UserAnswers)
            .HasForeignKey(quizGroup => quizGroup.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}