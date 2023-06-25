using Application.Common.Exceptions;
using Application.QuizGroups.Queries.GetQuizGroup;
using Application.QuizGroups.Queries.GetUserQuizIds;
using Application.QuizGroups.Queries.GetUserScores;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
public class QuizGroupController : BaseController
{
    
    [HttpGet("getQuizGroup")]
    public async Task<ActionResult<int>> GetQuizGroup([FromQuery] GetQuizGroupQuery query)
    {
        try
        {
            var quizChecking = await Mediator.Send(query);
            return Ok(quizChecking);
        }
        catch (Exception ex)
        {
            return ex switch
            {
                NotFoundException => NotFound(),
                PermissionDeniedException => Forbid(),
                _ => BadRequest()
            };
        }
    }
    
    [HttpGet("getUserQuizIds")]
    public async Task<ActionResult<int>> GetUserQuizIds([FromQuery] GetUserQuizIdsQuery query)
    {
        try
        {
            var ids = await Mediator.Send(query);
            return Ok(ids);
        }
        catch (Exception ex)
        {
            return ex switch
            {
                NotFoundException => NotFound(),
                PermissionDeniedException => Forbid(),
                _ => BadRequest()
            };
        }
    } 
    
    [HttpGet("getUserScores")]
    public async Task<ActionResult<int>> GetUserScores([FromQuery] GetUserScoresQuery query)
    {
        try
        {
            var userScores = await Mediator.Send(query);
            return Ok(userScores);
        }
        catch (Exception ex)
        {
            return ex switch
            {
                NotFoundException => NotFound(),
                PermissionDeniedException => Forbid(),
                _ => BadRequest()
            };
        }
    } 
}