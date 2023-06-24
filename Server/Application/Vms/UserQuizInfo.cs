using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Vms;

public class UserQuizInfo : IMapWith<UserQuiz>
{
    public DateTime Finished { get; set; }
    public int Score { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<UserQuiz, UserQuizInfo>()
            .ForMember(userQuizInfo => userQuizInfo.Score,
                opt => opt.MapFrom(userQuiz => userQuiz.Score))
            .ForMember(userQuizInfo => userQuizInfo.Finished,
                opt => opt.MapFrom(userQuiz => userQuiz.EndTime));
    }
}