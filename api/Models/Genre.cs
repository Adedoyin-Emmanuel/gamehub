using System.ComponentModel.DataAnnotations.Schema;


namespace api.Models;

public class Genre
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; } 
}