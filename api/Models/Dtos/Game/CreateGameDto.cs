using System.ComponentModel.DataAnnotations;

namespace api.Models.Dtos.Game;


public record CreateGameDto(
    
    string Name,
    
    string Description,
    
    string Genre
    
);