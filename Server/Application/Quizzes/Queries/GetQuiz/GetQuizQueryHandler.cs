using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Queries.GetQuiz;

public class GetQuizQueryHandler : RequestHandler, IRequestHandler<GetQuizQuery, QuizView>
{
    public GetQuizQueryHandler(IDbContext context) : base(context) {}
    
    public async Task<QuizView> Handle(GetQuizQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Quizzes
            .Include(q => q.Creator)
            .Include(quiz => quiz.Questions)
                .ThenInclude(question => question.Answers)
            .Include(quiz => quiz.Questions)
                .ThenInclude(question => question.CorrectAnswers)
            .FirstOrDefaultAsync(quiz => quiz.Id == request.Id, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(Quiz), request.Id);

        if (entity.Creator.Id != request.Id)
            throw new PermissionDeniedException();
        
        var quiz = new QuizView
        {
            Id = entity.Id,
            Title = entity.Name,
            Description = entity.Description,
            Questions = entity.Questions.Select(question => new QuestionView
                {
                    Id = question.Id,
                    TypeId = question.QuestionTypeId,
                    MaxScore = question.Score,
                    Required = question.Required,
                    Content = question.Content,
                    Options = question.Answers.Select(answer => new OptionView
                        {
                            Answer = answer.Content,
                            Id = answer.Id
                        })
                        .ToList(),
                    CorrectOptions = question.CorrectAnswers.Select(answer => new OptionView
                        {
                            Answer = answer.Content,
                            Id = answer.Id
                        })
                        .ToList()
                })
                .ToList()
        };
        
        return quiz;
    }
}