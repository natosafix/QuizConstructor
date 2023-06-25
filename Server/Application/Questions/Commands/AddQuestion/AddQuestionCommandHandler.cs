using Application.Common.Abstracts;
using Application.Interfaces;
using Domain;
using MediatR;

namespace Application.Questions.Commands.AddQuestion;

public class AddQuestionCommandHandler : RequestHandler, IRequestHandler<AddQuestionCommand, int>
{
    public AddQuestionCommandHandler(IDbContext context) : base(context) { }

    public async Task<int> Handle(AddQuestionCommand request, CancellationToken cancellationToken)
    {
        var question = new Question
        {
            Content = request.Content,
            QuizId = request.QuizId,
            QuestionTypeId = request.TypeId
        };

        await context.Questions.AddAsync(question, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return question.Id;
    }
}