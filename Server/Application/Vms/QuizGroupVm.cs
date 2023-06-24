using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class QuizGroupVm : IMapWith<QuizGroup>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<QuizGroup, QuizGroupVm>()
            .ForMember(quizGroupVm => quizGroupVm.Id,
                opt => opt.MapFrom(quizGroup => quizGroup.Id))
            .ForMember(quizGroupVm => quizGroupVm.Name,
                opt => opt.MapFrom(quizGroup => quizGroup.Quiz.Name))
            .ForMember(quizGroupVm => quizGroupVm.Description,
                opt => opt.MapFrom(quizGroup => quizGroup.Quiz.Description))
            .ForMember(quizGroupVm => quizGroupVm.StartTime,
                opt => opt.MapFrom(quizGroup => quizGroup.StartTime))
            .ForMember(quizGroupVm => quizGroupVm.EndTime,
                opt => opt.MapFrom(quizGroup => quizGroup.EndTime));
    }
}