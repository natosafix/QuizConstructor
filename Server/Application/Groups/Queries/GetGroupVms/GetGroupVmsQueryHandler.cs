using Application.Common.Abstracts;
using Application.Common.Exceptions;
using Application.Interfaces;
using Application.Vms;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Groups.Queries.GetGroupVms;

public class GetGroupVmsQueryHandler : RequestHandler, IRequestHandler<GetGroupVmsQuery, GroupVmList>
{
    public GetGroupVmsQueryHandler(IDbContext context) : base(context) { }

    public async Task<GroupVmList> Handle(GetGroupVmsQuery request, CancellationToken cancellationToken)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(user => user.Login == request.Login, cancellationToken);

        if (user == null)
            throw new NotFoundException(nameof(Group), request.Login);

        var adminGroupListVm = await context.Groups
            .Include(group => group.Admins)
            .Include(group => group.QuizGroups)
                .ThenInclude(quizGroup => quizGroup.UserQuizzes)
            .Include(group => group.QuizGroups)
                .ThenInclude(quizGroup => quizGroup.Quiz)
            .Where(group => group.Admins.Contains(user))
            .Select(group => new GroupVm
            {
                Id = group.Id,
                IsAdmin = false,
                Name = group.Name,
                QuizResults = group.QuizGroups.Select(x => new QuizResult
                {
                    Id = x.Id,
                    Name = x.Quiz.Name,
                    Description = x.Quiz.Description,
                    StartTime = x.StartTime,
                    EndTime = x.EndTime,
                    Finished = null,
                    Score = null
                })
                    .ToList()
            }).ToListAsync(cancellationToken);
        
        var userGroupListVm = await context.Groups
            .Include(group => group.Users)
            .Include(group => group.QuizGroups)
                .ThenInclude(quizGroup => quizGroup.UserQuizzes)
            .Include(group => group.QuizGroups)
                .ThenInclude(quizGroup => quizGroup.Quiz)
            .Where(group => group.Users.Contains(user))
            .Select(group => new GroupVm
            {
                Id = group.Id,
                IsAdmin = true,
                Name = group.Name,
                QuizResults = group.QuizGroups.Select(x => new QuizResult
                    {
                        Id = x.Id,
                        Name = x.Quiz.Name,
                        Description = x.Quiz.Description,
                        StartTime = x.StartTime,
                        EndTime = x.EndTime,
                        Finished = x.UserQuizzes.FirstOrDefault(userQuiz => userQuiz.UserId == user.Id) != null ? 
                            x.UserQuizzes.FirstOrDefault(userQuiz => userQuiz.UserId == user.Id)!.EndTime : null,
                        Score = x.UserQuizzes.FirstOrDefault(userQuiz => userQuiz.UserId == user.Id) != null ? 
                            x.UserQuizzes.FirstOrDefault(userQuiz => userQuiz.UserId == user.Id)!.Score : null
                    })
                    .ToList()
            }).ToListAsync(cancellationToken);
        var tmp = adminGroupListVm.Concat(userGroupListVm).ToList();
        return new GroupVmList {GroupVms = tmp};
    }
}