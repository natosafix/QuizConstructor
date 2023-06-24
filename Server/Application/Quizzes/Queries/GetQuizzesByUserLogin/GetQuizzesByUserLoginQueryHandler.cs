using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Quizzes.Queries.GetQuiz;
using Application.Users.Queries.GetUserByPassword;
using Application.Vms;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Quizzes.Queries.GetQuizzesByUserLogin;

public class GetQuizzesByUserLoginQueryHandler : RequestHandler, IRequestHandler<GetQuizzesByUserLoginQuery, QuizListVm>
{
    private readonly IMapper mapper;

    public GetQuizzesByUserLoginQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;

    public async Task<QuizListVm> Handle(GetQuizzesByUserLoginQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(User), request.Login);

        var quizVms =
            await context.Quizzes.Where(quiz => quiz.CreatorId == entity.Id)
                .ProjectTo<QuizVm>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        
        return new QuizListVm { QuizVms = quizVms };
    }
}