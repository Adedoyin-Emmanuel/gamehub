using api.Models.Dtos.Game;
using FluentValidation;

namespace api.Validators.Game;

public class UpdateGameValidator : AbstractValidator<UpdateGameDto>
{
    public UpdateGameValidator()
    {
        RuleFor(game => game.Name).NotEmpty().When(game => game.Name != string.Empty).MaximumLength(30);

        RuleFor(game => game.Description).NotEmpty().When(game => game.Description != string.Empty).MaximumLength(1200);
        
        RuleFor(game => game.Genre).NotEmpty().When(game => game.Genre != string.Empty).MaximumLength(20);
        
    }
}