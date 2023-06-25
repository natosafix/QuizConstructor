using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class UserQuestionConfiguration : IEntityTypeConfiguration<UserQuestion>
{
    public void Configure(EntityTypeBuilder<UserQuestion> builder)
    {
        builder.HasKey(answer => answer.Id);

        builder.HasIndex(answer => answer.Id);

        builder.Property(answer => answer.Id)
            .IsRequired();
        builder.Property(answer => answer.QuestionId)
            .IsRequired();
        builder.Property(answer => answer.UserQuizId)
            .IsRequired();
        builder.Property(answer => answer.Score)
            .IsRequired();

        builder.HasOne(answer => answer.Question)
            .WithMany(question => question.UserQuestions)
            .HasForeignKey(answer => answer.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(answer => answer.UserQuiz)
            .WithMany(question => question.Questions)
            .HasForeignKey(answer => answer.UserQuizId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}