using Application.Quizzes.Commands.CreateQuiz;
using Application.Quizzes.Commands.UpdateQuiz;
using Application.Quizzes.Queries.GetQuiz;
using Application.Quizzes.Queries.GetQuizForUser;
using Application.Quizzes.Queries.GetQuizzesByUserLogin;
using Application.UserQuizzes.Command.CreateUserQuiz;
using Application.UserQuizzes.Query.GetUserQuiz;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
namespace Web.Controllers;

[Route("api/[controller]")]
public class QuizController : BaseController
{
    private readonly IMapper mapper;

    public QuizController(IMapper mapper) => this.mapper = mapper;

    [HttpGet("getQuiz")]
    public async Task<ActionResult<int>> GetQuiz([FromQuery] GetQuizQuery command)
    {
        var quizVm = await Mediator.Send(command);
        return Ok(quizVm);
    }
    
    [HttpGet("getQuizzesByLogin")]
    public async Task<ActionResult<int>> GetQuizzesByLogin([FromQuery] GetQuizzesByUserLoginQuery command)
    {
        var quizListVm = await Mediator.Send(command);
        return Ok(quizListVm);
    }

    [HttpPost("createQuiz")]
    public async Task<ActionResult<int>> CreateQuiz([FromBody] CreateQuizCommand command)
    {
        var quizId = await Mediator.Send(command);
        return Ok(quizId);
    }
    
    [HttpPut("updateQuiz")]
    public async Task<ActionResult<int>> UpdateQuiz([FromBody] UpdateQuizCommand command)
    {
        var quizId = await Mediator.Send(command);
        return Ok(quizId);
    }
    
    [HttpGet("getQuizForUser")]
    public async Task<ActionResult<int>> GetQuizForUser([FromQuery] GetQuizForUserQuery command)
    {
        var quiz = await Mediator.Send(command);
        return Ok(quiz);
    }
    
    [HttpGet("getUserQuiz")]
    public async Task<ActionResult<int>> GetUserQuiz([FromQuery] GetUserQuizQuery command)
    {
        var quiz = await Mediator.Send(command);
        return Ok(quiz);
    }

    [HttpPost("createUserQuiz")]
    public async Task<ActionResult<int>> CreateUserQuiz([FromBody] CreateUserQuizCommand command)
    {
        var quizId = await Mediator.Send(command);
        return Ok(quizId);
    }
}