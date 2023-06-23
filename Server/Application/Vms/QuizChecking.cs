﻿namespace Application.Vms;

public class QuizChecking
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public List<QuestionVm> QuestionVms { get; set; }
}