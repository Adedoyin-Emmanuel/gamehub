using Microsoft.AspNetCore.Mvc;
using api.Extensions;

namespace api.Controllers;


[ApiController]
[Route("[controller]")]
public class GameController(ILogger<GameController> logger): ControllerBase
{
   private readonly ILogger<GameController> _logger = logger;


   [HttpGet]
   public async Task<IActionResult> Games()
   {
      _logger.LogInformation("Getting games...");
      return Ok(new Response(200, "Games fetched successfully"));
   }
   
}