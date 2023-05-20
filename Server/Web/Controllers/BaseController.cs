using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public abstract class BaseController : ControllerBase
{
    private IMediator mediator;
    protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}