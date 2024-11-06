using Microsoft.EntityFrameworkCore;
using api.Models;


namespace api.Data;

public class AppContext: DbContext
{
    public AppContext(DbContextOptions<AppContext> options): base(options)
    {
        
    }
    
    public DbSet<Game> Game { get; set; }
    public DbSet<Genre> Genre { get; set;}
}
