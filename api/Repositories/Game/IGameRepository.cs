using api.Models;

namespace api.Repositories.Game;

public interface IGameRepository
{
   void createGame(Models.Game game);
}