using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;


public class Game
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required Genre Genre { get; set; }
    public required string ImageUrl { get; set; }
    
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }
}