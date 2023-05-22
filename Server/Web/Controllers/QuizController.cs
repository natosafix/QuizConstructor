﻿using Application.Quizzes.Commands.CreateQuiz;
using Application.Quizzes.Queries.GetQuiz;
using Application.Quizzes.Queries.GetQuizzesByUserLogin;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
namespace Web.Controllers;

[Route("api/[controller]")]
public class QuizController : BaseController
{
    private readonly IMapper mapper;

    public QuizController(IMapper mapper) => this.mapper = mapper;

    [HttpGet("getQuiz")]
    public async Task<ActionResult<int>> GetQuiz([FromBody] GetQuizQuery command)
    {
        var quizVm = await Mediator.Send(command);
        return Ok(quizVm);
    }
    
    [HttpGet("getQuizzesByLogin")]
    public async Task<ActionResult<int>> GetQuizzesByLogin([FromBody] GetQuizzesByUserLoginQuery command)
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
}