using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration["DbConnection"];

        services.AddDbContext<QuizDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        services.AddScoped<IDbContext>(provider => provider.GetService<QuizDbContext>());
        return services;
    }
}