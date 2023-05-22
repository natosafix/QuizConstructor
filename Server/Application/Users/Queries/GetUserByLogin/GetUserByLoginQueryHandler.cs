using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Users.Queries.GetUserByPassword;
using Application.Vms;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUserByLogin;

public class GetUserByLoginQueryHandler : RequestHandler,  IRequestHandler<GetUserByLoginQuery, UserVm>
{
    public GetUserByLoginQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;
    
    private readonly IMapper mapper;

    public async Task<UserVm> Handle(GetUserByLoginQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (entity == null)
            throw new NotFoundException(nameof(User), request.Login);

        entity.Quizzes =
            await context.Quizzes.Where(quiz => quiz.CreatorId == entity.Id).ToListAsync(cancellationToken);
        
        return mapper.Map<UserVm>(entity);
    }
}