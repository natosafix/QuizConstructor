using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces;

public interface IDbContext
{
    DbSet<User> Users { get; set; }
    DbSet<CorrectAnswer> CorrectAnswers { get; set; }
    DbSet<Answer> Answers { get; set; }
    DbSet<Group> Groups { get; set; }
    DbSet<Question> Questions { get; set; }
    DbSet<QuestionType> QuestionTypes { get; set; }
    DbSet<UserQuiz> UserQuizzes { get; set; }
    DbSet<Quiz> Quizzes { get; set; }
    
    DbSet<QuizGroup> QuizGroups { get; set; }
    DbSet<UserQuestion> UserQuestions { get; set; }
    DbSet<UserAnswer> UserAnswers { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}