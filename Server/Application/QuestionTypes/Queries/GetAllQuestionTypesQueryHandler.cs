using Application.Common.Abstracts;
using Application.Interfaces;
using Application.Vms;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.QuestionTypes.Queries;

public class GetAllQuestionTypesQueryHandler : RequestHandler, IRequestHandler<GetAllQuestionTypesQuery, QuestionTypeListVm>
{
    private IMapper mapper;
    
    public GetAllQuestionTypesQueryHandler(IDbContext context, IMapper mapper) : base(context) => this.mapper = mapper;

    public async Task<QuestionTypeListVm> Handle(GetAllQuestionTypesQuery request, CancellationToken cancellationToken)
    {
        var questionTypes = await context.QuestionTypes
            .ProjectTo<QuestionTypeVm>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new QuestionTypeListVm{QuestionTypeVms = questionTypes};
    }
}