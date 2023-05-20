using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class QuestionTypeConfiguration : IEntityTypeConfiguration<QuestionType>
{
    public void Configure(EntityTypeBuilder<QuestionType> builder)
    {
        builder.HasKey(type => type.Id);

        builder.HasIndex(type => type.Id)
            .IsUnique();

        builder.Property(type => type.Id)
            .IsRequired();
        builder.Property(type => type.Name)
            .HasMaxLength(50)
            .IsRequired();
    }
}