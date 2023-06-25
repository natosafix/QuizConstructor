using MediatR;

namespace Application.QuizGroups.Queries.GetUserQuizIds;

public class GetUserQuizIdsQuery : IRequest<List<int>>
{
    public int Id { get; set; }
}