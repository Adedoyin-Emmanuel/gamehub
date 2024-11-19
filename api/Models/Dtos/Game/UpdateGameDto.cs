namespace api.Models.Dtos.Game;

public record UpdateGameDto(
    string? Name,
    
    string? Description,
    
    string? Genre,
    
    string? ImageUrl
    );