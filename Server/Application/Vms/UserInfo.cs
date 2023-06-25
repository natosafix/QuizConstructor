using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class UserInfo : IMapWith<User>
{
    public string Login { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<User, UserVm>()
            .ForMember(userVm => userVm.Login,
                opt => opt.MapFrom(user => user.Login))
            .ForMember(userVm => userVm.FirstName,
                opt => opt.MapFrom(user => user.FirstName))
            .ForMember(userVm => userVm.LastName,
                opt => opt.MapFrom(user => user.LastName));
    }
}