using Application.Users.Commands.ChangeUserPassword;
using Application.Users.Commands.CreateUser;
using Application.Users.Queries.GetUserByLogin;
using Application.Users.Queries.GetUserByPassword;
using Application.Vms;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
public class UserController : BaseController
{
    private readonly IMapper mapper;

    public UserController(IMapper mapper) => this.mapper = mapper;

    [HttpGet("login")]
    public async Task<ActionResult<UserVm>> GetUserByPassword([FromQuery] GetUserByPasswordQuery query)
    {
        var userVm = await Mediator.Send(query);
        return Ok(userVm);
    }
    
    [HttpGet("getUser")]
    public async Task<ActionResult<UserVm>> GetUserByLogin([FromQuery] GetUserByLoginQuery query)
    {

        try
        {
            var userVm = await Mediator.Send(query);
            return Ok(userVm);
        }
        catch
        {
            return Ok(null);
        }
        
    }
    
    [HttpPost("createUser")]
    public async Task<ActionResult<int>> CreateUser([FromBody] CreateUserCommand command)
    {
        var userId = await Mediator.Send(command);
        return Ok(userId);
    }
    
    [HttpPut]
    public async Task<IActionResult> ChangePassword([FromBody] ChangeUserPasswordCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }
}
