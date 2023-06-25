using Application.Common.Mappings;
using AutoMapper;

namespace Application.Vms;

public class QuizResult : IMapWith<ShortResult>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int? Score { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public DateTime? Finished { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<ShortResult, QuizResult>()
            .ForMember(quizResult => quizResult.Id,
                opt => opt.MapFrom(shortResult => shortResult.QuizGroupVm.Id))
            .ForMember(quizResult => quizResult.Name,
                opt => opt.MapFrom(shortResult => shortResult.QuizGroupVm.Name))
            .ForMember(quizResult => quizResult.Description,
                opt => opt.MapFrom(shortResult => shortResult.QuizGroupVm.Description))
            .ForMember(quizResult => quizResult.StartTime,
                opt => opt.MapFrom(shortResult => shortResult.QuizGroupVm.StartTime))
            .ForMember(quizResult => quizResult.EndTime,
                opt => opt.MapFrom(shortResult => shortResult.QuizGroupVm.EndTime))
            .ForMember(quizResult => quizResult.Score,
                opt => opt.MapFrom(shortResult => shortResult.UserQuizInfo.Score));
    }
}