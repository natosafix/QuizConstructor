﻿using MediatR;

namespace Application.Users.Commands.DeleteUser;

public class DeleteUserCommand : IRequest
{
    public string Login { get; set; }
}