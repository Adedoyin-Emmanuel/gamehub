using api.Models.Dtos.Game;
using FluentValidation;

namespace api.Validators.Game;

public class UpdateGameValidator : AbstractValidator<UpdateGameDto>
{
    public UpdateGameValidator()
    {
        RuleFor(game => game.Name)
            .MaximumLength(30)
            .When(game => game.Name != null);

        RuleFor(game => game.Description)
            .MaximumLength(1200)
            .When(game => game.Description != null);
        
        RuleFor(game => game.Genre)
            .MaximumLength(20)
            .When(game => game.Genre != null);
    }
}