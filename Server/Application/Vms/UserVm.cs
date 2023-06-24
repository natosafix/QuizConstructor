using Application.Common.Mappings;
using Application.Quizzes.Queries.GetQuiz;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class UserVm : IMapWith<User>
{
    public string Login { get; set; }
    
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public List<QuizVm> QuizVms { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<User, UserVm>()
            .ForMember(userVm => userVm.Login,
                opt => opt.MapFrom(user => user.Login))
            .ForMember(userVm => userVm.FirstName,
                opt => opt.MapFrom(user => user.FirstName))
            .ForMember(userVm => userVm.Password,
                opt => opt.MapFrom(user => user.Password))
            .ForMember(userVm => userVm.LastName,
                opt => opt.MapFrom(user => user.LastName))
            .ForMember(userVm => userVm.QuizVms,
                opt => opt.MapFrom(user => user.Quizzes));
    }
}