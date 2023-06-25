using Application.Vms;
using MediatR;

namespace Application.QuizGroups.Queries.GetUserScores;

public class GetUserScoresQuery : IRequest<List<UserScoreVm>>
{
    public int Id { get; set; }
}