using Application.QuizGroups.Queries.GetQuizGroup;
using Application.QuizGroups.Queries.GetUserQuizIds;
using Application.QuizGroups.Queries.GetUserScores;
using Application.Users.Commands.ChangeUserPassword;
using Application.Users.Commands.CreateUser;
using Application.Users.Queries.GetUserByLogin;
using Application.Users.Queries.GetUserByPassword;
using Application.Vms;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
public class QuizGroupController : BaseController
{
    
    [HttpGet("getQuizGroup")]
    public async Task<ActionResult<UserVm>> GetQuizGroup([FromQuery] GetQuizGroupQuery query)
    {
        var quizChecking = await Mediator.Send(query);
        return Ok(quizChecking);
    }
    
    [HttpGet("getUserQuizIds")]
    public async Task<ActionResult<UserVm>> GetUserQuizIds([FromQuery] GetUserQuizIdsQuery query)
    {
        var ids = await Mediator.Send(query);
        return Ok(ids);
    } 
    
    [HttpGet("getUserScores")]
    public async Task<ActionResult<UserVm>> GetUserScores([FromQuery] GetUserScoresQuery query)
    {
        var userScores = await Mediator.Send(query);
        return Ok(userScores);
    } 
}