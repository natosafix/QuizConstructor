using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class GroupVm : IMapWith<Group>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsAdmin { get; set; }
    
    public List<QuizResult> QuizResults { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Group, GroupVm>()
            .ForMember(groupVm => groupVm.Id,
                opt => opt.MapFrom(group => group.Id))
            .ForMember(groupVm => groupVm.Name,
                opt => opt.MapFrom(group => group.Name));
    }
}