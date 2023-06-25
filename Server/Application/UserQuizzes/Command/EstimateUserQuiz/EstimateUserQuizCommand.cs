﻿using Application.Vms;
using MediatR;

namespace Application.UserQuizzes.Command.EstimateUserQuiz;

public class EstimateUserQuizCommand : IRequest<int>
{
    public string Login { get; set; }
    public int Id { get; set; }
    public List<Point> Points { get; set; }
}