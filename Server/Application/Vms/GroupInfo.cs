using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class GroupInfo : IMapWith<Group>
{
    public int Id { get; set; }
    public string Name { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Group, GroupInfo>()
            .ForMember(groupInfo => groupInfo.Id,
                opt => opt.MapFrom(group => group.Id))
            .ForMember(groupInfo => groupInfo.Name,
                opt => opt.MapFrom(group => group.Name));
    }
}