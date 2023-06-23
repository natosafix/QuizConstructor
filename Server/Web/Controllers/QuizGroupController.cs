using Application.QuizGroups.Queries.GetQuizGroup;
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
    public async Task<ActionResult<UserVm>> GetQuizGroup([FromBody] GetQuizGroupQuery query)
    {
        var quizChecking = await Mediator.Send(query);
        return Ok(quizChecking);
    }
}