using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class QuizVm : IMapWith<Quiz>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Quiz, QuizVm>()
            .ForMember(quizVm => quizVm.Id,
                opt => opt.MapFrom(quiz => quiz.Id))
            .ForMember(quizVm => quizVm.Name,
                opt => opt.MapFrom(quiz => quiz.Name))
            .ForMember(quizVm => quizVm.Description,
                opt => opt.MapFrom(quiz => quiz.Description));
    }
        
}