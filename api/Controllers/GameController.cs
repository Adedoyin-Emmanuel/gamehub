using Microsoft.AspNetCore.Mvc;
using api.Extensions;
using Asp.Versioning;

namespace api.Controllers;


[ApiVersion(1)]
[ApiController]
[Route("v{v:apiVersion}/[controller]")]
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