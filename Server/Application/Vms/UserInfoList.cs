using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class UserInfoList : IMapWith<ICollection<User>>
{
    public string Name { get; set; }
    public List<UserInfo> UserInfos { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<User, UserInfo>()
            .ForMember(dto => dto.Login, opt => opt.MapFrom(p => p.Login))
            .ForMember(dto => dto.FirstName, opt => opt.MapFrom(p => p.FirstName))
            .ForMember(dto => dto.LastName, opt => opt.MapFrom(p => p.LastName));
        profile.CreateMap<ICollection<User>, UserInfoList>()
            .ForMember(dto => dto.UserInfos, opt => opt.MapFrom(p => p));
    }
}