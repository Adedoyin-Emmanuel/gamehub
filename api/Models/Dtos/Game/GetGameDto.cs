namespace api.Models.Dtos.Game;

public record GetGameDto(
    int Take = 10,
    int Skip = 0
);