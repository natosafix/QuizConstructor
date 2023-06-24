﻿using Application.Groups.Commands;
using Application.Groups.Commands.AddAdminInGroup;
using Application.Groups.Commands.AddUserInGroup;
using Application.Groups.Commands.AssignQuiz;
using Application.Groups.Commands.CreateGroup;
using Application.Groups.Commands.DeleteAdmin;
using Application.Groups.Commands.DeleteUser;
using Application.Groups.Queries.GetGroupAdmins;
using Application.Groups.Queries.GetGroupsInfo;
using Application.Groups.Queries.GetGroupUsers;
using Application.Groups.Queries.GetGroupVms;
using Application.Vms;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Web.Controllers;

[Route("api/[controller]")]
public class GroupController : BaseController
{
    [HttpPost("create")]
    public async Task<ActionResult<int>> Create([FromBody] CreateGroupCommand command)
    {
        try
        {
            var groupId = await Mediator.Send(command);
            return Ok(groupId);
        }
        catch
        {
            return Ok(null);
        }
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

    [HttpDelete("deleteAdmin")]
    public async Task<ActionResult<int>> DeleteAdmin([FromBody] DeleteAdminCommand command)
    {
        var groupId = await Mediator.Send(command);
        return Ok(groupId);
    }
    
    [HttpDelete("deleteUser")]
    public async Task<ActionResult<int>> DeleteUser([FromBody] DeleteUserCommand command)
    {
        var groupId = await Mediator.Send(command);
        return Ok(groupId);
    }
    
    [HttpGet("getAdmins")]
    public async Task<ActionResult<int>> GetAdmins([FromQuery] GetGroupAdminsQuery command)
    {
        var userInfoList = await Mediator.Send(command);
        return Ok(userInfoList);
    }
    
    [HttpGet("getUsers")]
    public async Task<ActionResult<int>> GetUsers([FromQuery] GetGroupUsersQuery command)
    {
        var userInfoList = await Mediator.Send(command);
        return Ok(userInfoList);
    }
    
    [HttpGet("getGroupsInfo")]
    public async Task<ActionResult<int>> GetGroupsInfo([FromQuery] GetGroupsInfoQuery command)
    {
        var groupListInfo = await Mediator.Send(command);
        return Ok(groupListInfo);
    }
    
    [HttpGet("getGroups")]
    public async Task<ActionResult<List<GroupVm>>> GetGroups([FromQuery] GetGroupVmsQuery command)
    {
        var groupVmList = await Mediator.Send(command);
        return Ok(groupVmList.GroupVms);
    }
}