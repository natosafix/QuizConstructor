using Application.Vms;
using MediatR;

namespace Application.QuizGroups.Queries.GetQuizGroup;

public class GetQuizGroupQuery : IRequest<QuizChecking>
{
    public int Id { get; set; }
    public string Login { get; set; }
}