﻿namespace Persistence;

public class DbInitializer
{
    public static void Initialize(QuizDbContext context)
    {
        context.Database.EnsureCreated();
    }
}