namespace api.Repositories.Game;


public interface IGameRepository
{
   
   Task<Models.Game> CreateGame (Models.Game game);
}