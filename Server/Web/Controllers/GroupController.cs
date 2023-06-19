using Application.Groups.Commands;
using Application.Groups.Commands.AddAdminInGroup;
using Application.Groups.Commands.AddUserInGroup;
using Application.Groups.Commands.AssignQuiz;
using Application.Groups.Commands.CreateGroup;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
public class GroupController : BaseController
{
    [HttpPost("create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateGroupCommand command)
    {
        var groupId = await Mediator.Send(command);
        return Ok(groupId);
    }
    
    [HttpPost("addAdmin")]
    public async Task<ActionResult<int>> AddAdmin([FromBody] AddAdminInGroupCommand command)
    {
        var groupId = await Mediator.Send(command);
        return Ok(groupId);
    }
    
    [HttpPost("addUser")]
    public async Task<ActionResult<int>> AddUser([FromBody] AddUserInGroupCommand command)
    {
        var groupId = await Mediator.Send(command);
        return Ok(groupId);
    }
    
    [HttpPost("assign")]
    public async Task<ActionResult<int>> AssignQuiz([FromBody] AssignQuizCommand command)
    {
        var groupId = await Mediator.Send(command);
        return Ok(groupId);
    }
}