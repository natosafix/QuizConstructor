using Application.Vms;
using Domain;
using MediatR;

namespace Application.QuestionTypes.Queries;

public class GetAllQuestionTypesQuery : IRequest<QuestionTypeListVm> { }