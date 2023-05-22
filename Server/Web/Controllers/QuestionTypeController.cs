using Application.QuestionTypes.Commands.AddQuestionType;
using Application.QuestionTypes.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
public class QuestionTypeController : BaseController
{
    
    [HttpGet("getAll")]
    public async Task<ActionResult<int>> GetAll([FromBody] GetAllQuestionTypesQuery command)
    {
        var questionTypes = await Mediator.Send(command);
        return Ok(questionTypes);
    }
    
    [HttpPost("add")]
    public async Task<ActionResult<int>> AddQuestionType([FromBody] AddQuestionTypeCommand command)
    {
        var questionId = await Mediator.Send(command);
        return Ok(questionId);
    }
}