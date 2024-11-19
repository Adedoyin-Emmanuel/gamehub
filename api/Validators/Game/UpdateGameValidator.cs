using api.Models.Dtos.Game;
using FluentValidation;
using api.Validators.Game;

namespace api.Validators.Game;

public class UpdateGameValidator : AbstractValidator<UpdateGameDto>
{
    public UpdateGameValidator()
    {
        RuleFor(game => game.Name).NotEmpty().When(game => game.Name != null).MaximumLength(30);

        RuleFor(game => game.Description).NotEmpty().When(game => game.Description != null).MaximumLength(1200);
        
        RuleFor(game => game.Genre).NotEmpty().When(game => game.Genre != null).MaximumLength(20);
        
    }
}