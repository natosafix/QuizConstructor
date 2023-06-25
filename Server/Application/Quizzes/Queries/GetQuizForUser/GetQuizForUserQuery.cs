using Application.Vms;
using MediatR;

namespace Application.Quizzes.Queries.GetQuizForUser;

public class GetQuizForUserQuery : IRequest<QuizForUser>
{
    public int Id { get; set; }
}