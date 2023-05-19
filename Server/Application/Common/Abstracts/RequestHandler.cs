using Application.Interfaces;

namespace Application.Common.Abstracts;

public abstract class RequestHandler
{
    protected readonly IDbContext context;

    protected RequestHandler(IDbContext context) => this.context = context;
}