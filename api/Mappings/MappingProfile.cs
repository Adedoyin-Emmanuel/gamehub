using AutoMapper;
using api.Models;
using api.Models.Dtos.Game;

namespace api.Mappings;

public class MappingProfile : Profile
{

    public MappingProfile()
    {
        CreateMap<CreateGameDto, Game>();

        CreateMap<UpdateGameDto, Game>().ForAllMembers(opts => opts.Condition((src, dest, srcMember)=> srcMember != null));
    }
}