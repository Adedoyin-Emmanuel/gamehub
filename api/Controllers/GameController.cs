using Microsoft.AspNetCore.Mvc;
using api.Extensions;
using Asp.Versioning;
using api.Models.Dtos.Game;

namespace api.Controllers;


[ApiVersion(1)]
[ApiController]
[Route("v{v:apiVersion}/[controller]")]
public class GameController(ILogger<GameController> logger): ControllerBase
{
   private readonly ILogger<GameController> _logger = logger;


   [HttpPost] 
   public async Task<IActionResult> Create(CreateGameDto createGameDto)
   {
    
      Console.WriteLine(createGameDto.Description);
     // _logger.LogInformation(createGameDto.ToString());
      return Ok(new Response(200, "Games created successfully"));
   }


   [HttpGet]
   public async Task<IActionResult> GetGames()
   {
      _logger.LogInformation("Getting games...");
      
      return Ok(new Response(200, "Games fetched successfully"));
   }
   
}