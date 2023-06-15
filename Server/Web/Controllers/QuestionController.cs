using Application.Questions.Commands.AddQuestion;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
public class QuestionController : BaseController
{
    [HttpPost("add")]
    public async Task<ActionResult<int>> AddQuestion([FromBody] AddQuestionCommand command)
    {
        var questionId = await Mediator.Send(command);
        return Ok(questionId);
    }
}