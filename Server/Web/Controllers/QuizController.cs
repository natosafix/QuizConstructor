using Application.Common.Exceptions;
using Application.Quizzes.Commands.CreateQuiz;
using Application.Quizzes.Commands.UpdateQuiz;
using Application.Quizzes.Queries.GetQuiz;
using Application.Quizzes.Queries.GetQuizForUser;
using Application.Quizzes.Queries.GetQuizzesByUserLogin;
using Application.UserQuizzes.Command.CreateUserQuiz;
using Application.UserQuizzes.Command.EstimateUserQuiz;
using Application.UserQuizzes.Query.GetUserQuiz;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
namespace Web.Controllers;

[Route("api/[controller]")]
public class QuizController : BaseController
{
    [HttpGet("getQuiz")]
    public async Task<ActionResult<int>> GetQuiz([FromQuery] GetQuizQuery command)
    {
        try
        {
            var quizVm = await Mediator.Send(command);
            return Ok(quizVm);
        }
        catch (Exception ex)
        {
            if (ex is NotFoundException)
                return NotFound();
            return Forbid();
        }
        
    }
    
    [HttpGet("getQuizzesByLogin")]
    public async Task<ActionResult<int>> GetQuizzesByLogin([FromQuery] GetQuizzesByUserLoginQuery command)
    {
        try
        {
            var quizListVm = await Mediator.Send(command);
            return Ok(quizListVm);
        }
        catch (Exception ex)
        {
            if (ex is NotFoundException)
                return NotFound();
            return Forbid();
        }
    }

    [HttpPost("createQuiz")]
    public async Task<ActionResult<int>> CreateQuiz([FromBody] CreateQuizCommand command)
    {
        try
        {
            var quizId = await Mediator.Send(command);
            return Ok(quizId);
        }
        catch (Exception ex)
        {
            if (ex is NotFoundException)
                return NotFound();
            return Forbid();
        }
        
    }
    
    [HttpPut("updateQuiz")]
    public async Task<ActionResult<int>> UpdateQuiz([FromBody] UpdateQuizCommand command)
    {
        try
        {
            var quizId = await Mediator.Send(command);
            return Ok(quizId);
        }
        catch (Exception ex)
        {
            if (ex is NotFoundException)
                return NotFound();
            return Forbid();
        }
    }
    
    [HttpGet("getQuizForUser")]
    public async Task<ActionResult<int>> GetQuizForUser([FromQuery] GetQuizForUserQuery command)
    {
        try
        {
            var quiz = await Mediator.Send(command);
            return Ok(quiz);
        }
        catch (Exception ex)
        {
            if (ex is NotFoundException)
                return NotFound();
            return Forbid();
        }
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

    [HttpPost("estimateUserQuiz")]
    public async Task<ActionResult<int>> EstimateUserQuiz([FromBody] EstimateUserQuizCommand command)
    {
        var quizId = await Mediator.Send(command);
        return Ok(quizId);
    }
}