using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Inputs;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserQuizzes.Command.CreateUserQuiz;

public class CreateUserQuizCommandHandler : RequestHandler, IRequestHandler<CreateUserQuizCommand, int>
{
    public CreateUserQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(CreateUserQuizCommand request, CancellationToken cancellationToken)
    {
        var quizGroup = await context.QuizGroups
            .Include(qg => qg.Quiz)
                .ThenInclude(q => q.Questions)
                    .ThenInclude(q => q.Answers)
            .Include(qg => qg.Quiz)
                .ThenInclude(q => q.Questions)
                    .ThenInclude(q => q.CorrectAnswers)
            .FirstOrDefaultAsync(quizGroup => quizGroup.Id == request.QuizGroupId, cancellationToken);

        if (quizGroup == null)
            throw new NotFoundException(nameof(QuizGroup), request.QuizGroupId);

        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.UserLogin, cancellationToken);

        if (user == null)
            throw new NotFoundException(nameof(User), request.UserLogin);
        
        var userQuiz = new UserQuiz
        {
            User = user,
            EndTime = DateTime.UtcNow,
            QuizGroup = quizGroup,
            Questions = quizGroup.Quiz.Questions.Select(question => new UserQuestion
            {
                Question = question,
                UserAnswers = request.Questions
                    .FirstOrDefault(userQuestion => userQuestion.Id == question.Id, new UserQuestionInput())
                    .Answers.Select(x => new UserAnswer
                    {
                        Content = x.Content
                    })
                    .ToList(),
                Score = AutoCheck(question.CorrectAnswers.Select(x => x.Content).ToList(),request.Questions
                    .FirstOrDefault(userQuestion => userQuestion.Id == question.Id, new UserQuestionInput()).Answers
                    .Select(x => x.Content).ToList()) ? question.Score : 0
            })
                .ToList()
        };
        userQuiz.Score = userQuiz.Questions.Sum(x => x.Score);
        await context.UserQuizzes.AddAsync(userQuiz, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        
        return userQuiz.Id;
    }

    public bool AutoCheck(List<string> correctAnswers, List<string> answers)
    {
        var result = correctAnswers.Intersect(answers).ToList();

        return result.Count >= correctAnswers.Count && answers.Count <= correctAnswers.Count;
    }
}