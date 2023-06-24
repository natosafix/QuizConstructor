using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Users.Commands.CreateUser;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Commands.CreateQuiz;

public class CreateQuizCommandHandler : RequestHandler, IRequestHandler<CreateQuizCommand, int>
{
    public CreateQuizCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(CreateQuizCommand request, CancellationToken cancellationToken)
    {

        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);
        
        if (user == null)
            throw new NotFoundException(nameof(User), request.Login);

        var types = await context.QuestionTypes.ToListAsync(cancellationToken);
        
        var quiz = new Quiz
        {
            Name = request.Title,
            Description = request.Description,
            Creator = user,
            Questions = request.Questions.Select( input => new Question
            {
                Type = types.FirstOrDefault(type => type.Id == input.TypeId),
                Content = input.Content,
                Required = input.Required,
                Score = input.MaxScore,
                Answers = input.Options.Select(option => new Answer
                {
                    Content = option.Answer
                })
                    .ToList(),
                CorrectAnswers = input.CorrectOptions.Select(option => new CorrectAnswer
                {
                    Content = option.Answer
                })
                    .ToList()
            })
                .ToList()
        };

        await context.Quizzes.AddAsync(quiz, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return quiz.Id;
    }
}