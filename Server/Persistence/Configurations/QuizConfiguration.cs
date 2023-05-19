using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
{
    public void Configure(EntityTypeBuilder<Quiz> builder)
    {
        builder.HasKey(quiz => quiz.Id);

        builder.HasIndex(quiz => quiz.Id)
            .IsUnique();

        builder.Property(quiz => quiz.Id)
            .IsRequired();
        builder.Property(quiz => quiz.Name)
            .HasMaxLength(150)
            .IsRequired();
        builder.Property(quiz => quiz.Description)
            .HasMaxLength(1024);
        builder.Property(quiz => quiz.Score)
            .IsRequired();
    }
}