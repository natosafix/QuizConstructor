using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain;

namespace Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Id);

        builder.HasIndex(user => user.Id)
            .IsUnique();
        builder.HasIndex(user => user.Login)
            .IsUnique();
        
        builder.Property(user => user.Id)
            .IsRequired();
        builder.Property(user => user.Login)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(user => user.Password)
            .IsRequired();
        builder.Property(user => user.FirstName)
            .IsRequired()
            .HasMaxLength(50);
        builder.Property(user => user.LastName)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasMany(user => user.UserGroups)
            .WithMany(group => group.Users);
        builder.HasMany(user => user.AdminGroups)
            .WithMany(group => group.Admins);
    }
}