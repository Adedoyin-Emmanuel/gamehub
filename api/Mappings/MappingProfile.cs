using AutoMapper;
using api.Models;
using api.Models.Dtos.Game;

namespace api.Mappings;

public class MappingProfile : Profile
{

    public MappingProfile()
    {
        CreateMap<CreateGameDto, Game>();   
    }
}