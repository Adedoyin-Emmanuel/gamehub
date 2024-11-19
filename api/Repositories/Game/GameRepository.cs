using api.Data;
using Microsoft.EntityFrameworkCore;


namespace api.Repositories.Game;

public class GameRepository : IGameRepository
{
    private readonly ILogger<GameRepository> _logger;
    private readonly GamehubContext _context;
    

    public GameRepository(ILogger<GameRepository> logger, GamehubContext context)
    {
        this._logger = logger;
        this._context = context;
    }
    
    public async Task<Models.Game> CreateGame(Models.Game game)
    { 
        var createdGame = await _context.Games.AddAsync(game);

        await _context.SaveChangesAsync();

        return createdGame.Entity;
    }

    public async Task<List<Models.Game>> GetAllGames(int skip, int take)
    {
        var gamesQuery =  _context.Games.AsQueryable();

        var filteredGames = gamesQuery.OrderBy(game=> game.CreatedAt).Skip(skip).Take(take);

        var allGames = await filteredGames.ToListAsync();

        return allGames;
    }
}