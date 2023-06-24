using Application.Common.Abstracts;
using Application.Interfaces;
using Domain;
using MediatR;

namespace Application.QuestionTypes.Commands.AddQuestionType;

public class AddQuestionTypeCommandHandler : RequestHandler, IRequestHandler<AddQuestionTypeCommand, int>
{
    public AddQuestionTypeCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(AddQuestionTypeCommand request, CancellationToken cancellationToken)
    {
        var questionType = new QuestionType
        {
            Name = request.Name
        };

        await context.QuestionTypes.AddAsync(questionType, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return questionType.Id;
    }
}