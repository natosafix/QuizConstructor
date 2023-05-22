using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class QuestionTypeVm : IMapWith<QuestionType>
{
    public int Id { get; set; }
    public string Name { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<QuestionType, QuestionTypeVm>()
            .ForMember(questionTypeVm => questionTypeVm.Id,
                opt => opt.MapFrom(questionType => questionType.Id))
            .ForMember(questionTypeVm => questionTypeVm.Name,
                opt => opt.MapFrom(questionType => questionType.Name));
    }
}