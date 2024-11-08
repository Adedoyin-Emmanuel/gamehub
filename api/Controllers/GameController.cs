using Microsoft.AspNetCore.Mvc;
using api.Extensions;
using api.Models;
using Asp.Versioning;
using api.Models.Dtos.Game;
using AutoMapper;

namespace api.Controllers;


[ApiVersion(1)]
[ApiController]
[Route("v{v:apiVersion}/[controller]")]
public class GameController(ILogger<GameController> logger, IMapper mapper): ControllerBase
{
   private readonly ILogger<GameController> _logger = logger;
   private readonly IMapper _mapper = mapper;
   
   


   [HttpPost] 
   public async Task<IActionResult> Create(CreateGameDto createGameDto)
   {


      return Ok(new Response(200, "Games created successfully"));
   }


   [HttpGet]
   public async Task<IActionResult> GetGames()
   {
      _logger.LogInformation("Getting games...");
      
      return Ok(new Response(200, "Games fetched successfully"));
   }
   
}