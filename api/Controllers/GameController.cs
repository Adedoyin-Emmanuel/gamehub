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

      if (game is null)
      {
         return NotFound(new Response(404, "Game not found"))
            ;
      }

      return Ok(new Response(200, "Game fetched successfully", game));
   }

   [HttpPut]
   [Route("{gameId:guid}")]
   public async Task<IActionResult> UpdateGame([FromForm] UpdateGameDto updateGameDto, IFormFile? file, [FromRoute]Guid gameId)
   {
      var existingGame = await _gameRepository.GetGameById(gameId);

      if (existingGame == null)
      {
         return BadRequest(new Response(404, "Game not found"));
      }

      var imageUrl = existingGame.ImageUrl;
      
      if (file is not null)
      {
         var (isSuccess, response) = FileUploadHandler.Upload(file);

         if (!isSuccess)
         {
            return BadRequest(new Response(400, response));
         }

         imageUrl = response;
      }
      
      updateGameDto = updateGameDto with { ImageUrl = imageUrl };
      _mapper.Map(updateGameDto, existingGame);

      var isUpdated = await gameRepository.UpdateGame(existingGame);

      if (!isUpdated)
      {
         return BadRequest(new Response(400, "Failed to update game"));
      }
      
      return Ok(new Response(200, "Game updated successfully", existingGame));
   }

   [HttpDelete]
   [Route("{gameId:guid}")]

   public async Task<IActionResult> DeleteGame(Guid gameId)
   {
      var existingGame = await _gameRepository.GetGameById(gameId);

      if (existingGame == null)
      {
         return BadRequest(new Response(404, "Game not found"));
      }

      var isDeleted = await _gameRepository.DeleteGame(gameId);

      if (!isDeleted)
      {
         return BadRequest(new Response(500, "Failed to delete game"));
      }
      
      return Ok(new Response(200, "Game deleted successfully"));
   }
}