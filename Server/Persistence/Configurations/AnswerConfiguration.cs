using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class AnswerConfiguration : IEntityTypeConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        builder.HasKey(answer => answer.Id);

        builder.HasIndex(answer => answer.Id);

        builder.Property(answer => answer.Id)
            .IsRequired();
        builder.Property(answer => answer.QuestionId)
            .IsRequired();
        builder.Property(answer => answer.Content)
            .IsRequired();

        builder.HasOne(answer => answer.Question)
            .WithMany(question => question.Answers)
            .HasForeignKey(answer => answer.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}