using System.ComponentModel.DataAnnotations;

namespace api.Models.Dtos.Game;

public record CreateGameDto(
    
    [Required, MaxLength(25), MinLength(1)] string Name,
    
    [Required, MaxLength(1000)] string Description,
    
    [Required] Genre Genre
    
);