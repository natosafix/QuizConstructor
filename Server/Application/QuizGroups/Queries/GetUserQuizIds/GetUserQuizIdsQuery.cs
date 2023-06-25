using MediatR;

namespace Application.QuizGroups.Queries.GetUserQuizIds;

public class GetUserQuizIdsQuery : IRequest<List<int>>
{
    public string Login { get; set; }
    public int Id { get; set; }
}