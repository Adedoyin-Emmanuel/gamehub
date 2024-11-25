using api.Data;
using api.Utils;
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

    public async Task<PaginatedResult<Models.Game>> GetAllGames(int skip, int take)
    {
        var gamesQuery =  _context.Games.AsQueryable();
        
        int totalGames = await _context.Games.CountAsync();
        
        var filteredGames = gamesQuery.OrderBy(game=> game.CreatedAt).Skip(skip).Take(take);

        var allGames = await filteredGames.ToListAsync();

        return new PaginatedResult<Models.Game>
        {
            Total = totalGames,
            Skip = skip,
            Take = take,
            Items = allGames,
        };
    }

    public async Task<Models.Game> GetGameById(Guid gameId)
    {
        var game = await _context.Games.FindAsync(gameId);

        return game;
    }

    public async Task<bool> UpdateGame(Models.Game game)
    {
        _context.Games.Update(game);

        return await _context.SaveChangesAsync() > 0;

    }

    public async Task<bool> DeleteGame(Guid id)
    {
        var existingGame = await _context.Games.FindAsync(id);

         _context.Games.Remove(existingGame);

         return await _context.SaveChangesAsync() > 0;
        
    }
}