using FluentValidation;
using api.Models.Dtos.Game;

namespace api.Validators.Game;

public class CreateGameValidator : AbstractValidator<CreateGameDto>
{
    public CreateGameValidator()
    {
        RuleFor(game => game.Name).NotEmpty().MaximumLength(30);

        RuleFor(game => game.Description).NotEmpty().MaximumLength(1200);

        RuleFor(game => game.Genre).NotEmpty().MaximumLength(20);
    }
}