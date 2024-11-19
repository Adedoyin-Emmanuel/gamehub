using FluentValidation;
using api.Models.Dtos.Game;
namespace api.Validators.Game;

public class GetGameValidator: AbstractValidator<GetGameDto>
{
    public GetGameValidator()
    {
        RuleFor(game => game.Take).GreaterThan(0).InclusiveBetween(1, 10);
        
    }
    
}