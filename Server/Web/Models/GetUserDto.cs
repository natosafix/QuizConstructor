using Application.Common.Mappings;
using Application.Users.Commands.CreateUser;
using Application.Users.Queries.GetUserByPassword;
using AutoMapper;

namespace Web.Models;

public class GetUserDto : IMapWith<GetUserByPasswordQuery>
{
    public string Login { get; set; }
    public string Password { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<GetUserDto, GetUserByPasswordQuery>()
            .ForMember(userCommand => userCommand.Login,
                opt => opt.MapFrom(userDto => userDto.Login))
            .ForMember(userCommand => userCommand.Password,
                opt => opt.MapFrom(userDto => userDto.Password));
    }
}