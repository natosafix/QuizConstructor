using Application.Users.Queries.GetUser;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Web.Models;

namespace Web.Controllers;

[Route("api/[controller]")]
public class UserController : BaseController
{
    private readonly IMapper mapper;

    public UserController(IMapper mapper) => this.mapper = mapper;

    [HttpGet]
    public async Task<ActionResult<UserVm>> GetUser([FromBody] GetUserDto getUserDto)
    {
        var query = mapper.Map<GetUserQuery>(getUserDto);

        var userVm = await Mediator.Send(query);

        return Ok(userVm);
    }
}