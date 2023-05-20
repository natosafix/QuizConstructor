using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class GroupConfiguration : IEntityTypeConfiguration<Group>
{
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.HasKey(group => group.Id);

        builder.HasIndex(group => group.Id)
            .IsDescending();

        builder.Property(group => group.Id)
            .IsRequired();
        builder.Property(group => group.Name)
            .IsRequired()
            .HasMaxLength(150);
        
        builder.HasMany(group => group.Users)
            .WithMany(user => user.UserGroups);
        builder.HasMany(group => group.Admins)
            .WithMany(user => user.AdminGroups);
    }
}