using FluentValidation;
using api.Models.Dtos.Game;

namespace api.Validators.Game;

public class CreateGameValidator : AbstractValidator<CreateGameDto>
{
    public CreateGameValidator()
    {
        RuleFor(game => game.Name).NotNull().NotEmpty().MaximumLength(30);

        RuleFor(game => game.Description).NotNull().NotEmpty().MaximumLength(1200);

        RuleFor(game => game.Genre).NotEmpty().NotEmpty();
    }
}