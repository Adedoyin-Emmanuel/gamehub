using Microsoft.AspNetCore.Mvc;
using api.Extensions;
using api.Models;
using Asp.Versioning;
using api.Models.Dtos.Game;
using api.Repositories.Game;
using AutoMapper;
using api.Utils;
namespace api.Controllers;


[ApiVersion(1)]
[ApiController]
[Route("v{v:apiVersion}/[controller]")]
public class GameController(ILogger<GameController> logger, IMapper mapper): ControllerBase
{
   private readonly ILogger<GameController> _logger = logger;
   private readonly IMapper _mapper = mapper;
   private readonly IGameRepository _gameRepository;
   
   


   [HttpPost] 
   public async Task<IActionResult> Create([FromForm] CreateGameDto createGameDto,  IFormFile file)
   {
      var (isSuccess, response) = FileUploadHandler.Upload(file);

      if (!isSuccess)
      {
         return BadRequest(new Response(400, response));
      }


      var updatedGame = createGameDto with { ImageUrl = response };
      var game = _mapper.Map<CreateGameDto, Game>(updatedGame);

      Console.WriteLine(game);
      
     // var createdGame = await _gameRepository.CreateGame(game);
      
      return Ok(new Response(200, "Games created successfully", new
      {
        game
      }));
   }


   [HttpGet]
   public async Task<IActionResult> GetGames()
   {
      _logger.LogInformation("Getting games...");
      
      return Ok(new Response(200, "Games fetched successfully"));
   }
   
}