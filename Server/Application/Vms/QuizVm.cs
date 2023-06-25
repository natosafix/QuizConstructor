using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class QuizVm : IMapWith<Quiz>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    public List<QuestionView> Questions { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Quiz, QuizVm>()
            .ForMember(quizVm => quizVm.Id,
                opt => opt.MapFrom(quiz => quiz.Id))
            .ForMember(quizVm => quizVm.Title,
                opt => opt.MapFrom(quiz => quiz.Name))
            .ForMember(quizVm => quizVm.Description,
                opt => opt.MapFrom(quiz => quiz.Description));
    }
        
}