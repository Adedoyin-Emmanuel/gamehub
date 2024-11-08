using Microsoft.EntityFrameworkCore;
using api.Models;


namespace api.Data;

public class GamehubContext: DbContext
{
    public GamehubContext(DbContextOptions<GamehubContext> options): base(options)
    {
        
    }
    
    public DbSet<Game> Games { get; set; }
}