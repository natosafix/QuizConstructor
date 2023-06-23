using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.QuizGroups.Queries.GetQuizGroup;

public class GetQuizGroupQueryHandler : RequestHandler, IRequestHandler<GetQuizGroupQuery, QuizChecking>
{
    public GetQuizGroupQueryHandler(IDbContext context) : base(context) { }

    public async Task<QuizChecking> Handle(GetQuizGroupQuery request, CancellationToken cancellationToken)
    {
        var quiz = await context.QuizGroups
            .Include(quizGroup => quizGroup.Quiz)
                .ThenInclude(quiz => quiz.Questions)
                    .ThenInclude(question => question.CorrectAnswers)
            .Include(quizGroup => quizGroup.Quiz)
                .ThenInclude(quiz => quiz.Questions)
                    .ThenInclude(question => question.Answers)
            .Include(quizGroup => quizGroup.Quiz)
                .ThenInclude(quiz => quiz.Questions)
                    .ThenInclude(question => question.Type)
            .FirstOrDefaultAsync(quizGroup => quizGroup.Id == request.Id, cancellationToken);

        if (quiz == null)
            throw new NotFoundException(nameof(QuizGroup), request.Id);

        return new QuizChecking
        {
            Id = quiz.Id,
            Title = quiz.Quiz.Name,
            Description = quiz.Quiz.Description,
            StartTime = quiz.StartTime,
            EndTime = quiz.EndTime,
            QuestionVms = quiz.Quiz.Questions.Select(question => new QuestionVm
                {
                    Id = question.Id,
                    Content = question.Content,
                    Required = question.Required,
                    MaxScore = question.Score,
                    IsAutoCheck = question.CorrectAnswers == null ? false : true,
                    Options = question.Answers.Select(option => new Option
                        {
                            Content = option.Content,
                            Id = option.Id
                        })
                        .ToList(),
                    CorrectOptions = question.CorrectAnswers.Select(option => new Option
                        {
                            Content = option.Content,
                            Id = option.Id
                        })
                        .ToList(),
                    TypeVm = new TypeVm
                    {
                        Id = question.Type.Id,
                        Name = question.Type.Name
                    }
                })
                .ToList()
        };
    }
}