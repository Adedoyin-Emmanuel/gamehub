using api.Utils;
namespace api.Repositories.Game;


public interface IGameRepository
{
   
   Task<Models.Game> CreateGame (Models.Game game);
   Task<PaginatedResult<Models.Game>> GetAllGames(int skip, int take);
   Task<Models.Game> GetGameById(Guid id);
   Task<bool> UpdateGame(Models.Game game);
   Task<bool> DeleteGame(Guid id);
}