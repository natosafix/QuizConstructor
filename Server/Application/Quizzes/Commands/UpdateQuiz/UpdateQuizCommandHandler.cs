using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Commands.UpdateQuiz;

public class UpdateQuizCommandHandler : RequestHandler, IRequestHandler<UpdateQuizCommand, int>
{
    public UpdateQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(UpdateQuizCommand request, CancellationToken cancellationToken)
    {
        var quizToUpdate = await context.Quizzes
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == request.Id, cancellationToken);
        
        var types = await context.QuestionTypes.ToListAsync(cancellationToken);

        quizToUpdate.Name = request.Title;
        quizToUpdate.Description = request.Description;
        
        var questionsToDelete = quizToUpdate.Questions
            .Where(existingQuestion => request.Questions
                .All(inputQuestion => inputQuestion.Id != existingQuestion.Id))
            .ToList();

        foreach (var question in questionsToDelete)
            context.Questions.Remove(question);

        foreach (var inputQuestion in request.Questions)
        {
            var existingQuestion = quizToUpdate.Questions
                        .FirstOrDefault(q => q.Id == inputQuestion.Id);
            
             if (existingQuestion == null)
             {
                 quizToUpdate.Questions.Add(new Question
                 {
                     Type = types.FirstOrDefault(type => type.Id == inputQuestion.TypeId),
                     Content = inputQuestion.Content,
                     Required = inputQuestion.Required,
                     Score = inputQuestion.MaxScore,
                     Answers = inputQuestion.Options.Select(option => new Answer
                     {
                         Content = option.Answer
                     })
                         .ToList(),
                     CorrectAnswers = inputQuestion.CorrectOptions.Select(option => new CorrectAnswer
                     {
                         Content = option.Answer
                     })
                         .ToList()
                 });
             }
             else
             {
                 existingQuestion.Content = inputQuestion.Content;
                 existingQuestion.Type = types.FirstOrDefault(type => type.Id == inputQuestion.TypeId);
                 existingQuestion.Required = inputQuestion.Required;
                 existingQuestion.Score = inputQuestion.MaxScore;
                 existingQuestion.Answers.Clear();
                 foreach (var option in inputQuestion.Options)
                 {
                     existingQuestion.Answers.Add(new Answer
                     {
                         Content = option.Answer
                     });
                }
                existingQuestion.CorrectAnswers.Clear();
                foreach (var correctOption in inputQuestion.CorrectOptions)
                {
                     existingQuestion.CorrectAnswers.Add(new CorrectAnswer
                     {
                         Content = correctOption.Answer
                     });
                }
            }
        }

        await context.SaveChangesAsync(cancellationToken);
        return quizToUpdate.Id;
    }
}