using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Queries.GetQuizForUser;

public class GetQuizForUserQueryHandler : RequestHandler, IRequestHandler<GetQuizForUserQuery, QuizForUser>
{
    public GetQuizForUserQueryHandler(IDbContext context) : base(context) { }

    public async Task<QuizForUser> Handle(GetQuizForUserQuery request, CancellationToken cancellationToken)
    {
       var quiz = await context.QuizGroups
           .Include(quizGroup => quizGroup.Quiz)
                .ThenInclude(quiz => quiz.Questions)
                    .ThenInclude(question => question.Answers)
            .Include(quizGroup => quizGroup.Quiz)
                .ThenInclude(quiz => quiz.Questions)
                    .ThenInclude(question => question.Type)
            .FirstOrDefaultAsync(quizGroup => quizGroup.Id == request.Id, cancellationToken);

        if (quiz == null)
            throw new NotFoundException(nameof(QuizGroup), request.Id);

        return new QuizForUser
        {
            Id = quiz.Id,
            Title = quiz.Quiz.Name,
            Description = quiz.Quiz.Description,
            StartTime = quiz.StartTime,
            EndTime = quiz.EndTime,
            QuestionVms = quiz.Quiz.Questions.Select(question => new QuestionForUser
                {
                    Id = question.Id,
                    Content = question.Content,
                    Required = question.Required,
                    MaxScore = question.Score,
                    Options = question.Answers.Select(option => new Option
                        {
                            Content = option.Content,
                            Id = option.Id
                        })
                        .ToList(),
                    Type = new TypeVm
                    {
                        Id = question.Type.Id,
                        Name = question.Type.Name
                    }
                })
                .ToList()
        };
    }
}