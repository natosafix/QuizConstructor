using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Queries.GetQuiz;

public class GetQuizQueryHandler : RequestHandler, IRequestHandler<GetQuizQuery, QuizVm>
{
    public GetQuizQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;
    
    private readonly IMapper mapper;

    public async Task<QuizVm> Handle(GetQuizQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Quizzes
            .FirstOrDefaultAsync(quiz => quiz.Id == request.Id, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(Quiz), request.Id);

        return mapper.Map<QuizVm>(entity);
    }
}