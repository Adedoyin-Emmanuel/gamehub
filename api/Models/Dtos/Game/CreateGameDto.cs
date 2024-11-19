namespace api.Models.Dtos.Game;


public record CreateGameDto(
    
    string Name,
    
    string Description,
    
    string Genre,
    
    string? ImageUrl
    
);