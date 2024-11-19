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
public class GameController(ILogger<GameController> logger, IMapper mapper, IGameRepository gameRepository): ControllerBase
{
   private readonly ILogger<GameController> _logger = logger;
   private readonly IMapper _mapper = mapper;
   private readonly IGameRepository _gameRepository = gameRepository;
   
   


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
      
      var createdGame = await _gameRepository.CreateGame(game);

      return Created($"/{ControllerContext.RouteData.Values["controller"]}/{createdGame.Id}", new Response(201, "Game created successfully.", createdGame ));
   }


   [HttpGet]
   public async Task<IActionResult> GetGames([FromQuery] GetGameDto getGameDto)
   {
      var allGames = await _gameRepository.GetAllGames(getGameDto.Skip, getGameDto.Take);
      return Ok(new Response(200, "Games fetched successfully", allGames));
   }


   [HttpGet]
   [Route("{gameId:guid}")]
   public async Task<IActionResult> GetGameById(Guid gameId)
   {
      var game = await _gameRepository.GetGameById(gameId);

      return Ok(new Response(200, "Game fetched successfully", game));
   }

   [HttpPatch]
   [Route("{gameId:guid}")]
   public async Task<IActionResult> UpdateGame(Guid gameId)
   {
      
   }
}