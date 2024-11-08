using api.Controllers;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;


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


    public async void createGame(Models.Game game)
    {
        await _context.Games.AddAsync(game);
    }
    
}