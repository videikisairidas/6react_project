using BackEndApi.Data;
using BackEndApi.DTO;
using BackEndApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackEndApi.Controllers.frontend
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShopController : Controller
    {


        //private readonly RecipeDbContext _context;

        //public RecipeController(RecipeDbContext context)
        //{
        //    _context = context; // Dependency injection
        //}

        //// Example: Get all favorite recipes
        //[HttpGet("favorites")]
        //public IActionResult GetFavorites([FromHeader] int userId)
        //{
        //    var favorites = _context.Favorites.Where(f => f.userId == userId).ToList();

        //    if (!favorites.Any())
        //    {
        //        return NotFound(new { message = "No favorites found for this user." });
        //    }

        //    return Ok(favorites);
        //}


        //[HttpPost("favorites/add")]
        //public IActionResult AddToFavorites([FromBody] RecipeFavoriteDTO request)
        //{
        //    if (_context.Favorites.Any(f => f.userId == request.userId && f.postId == request.postId))
        //    {
        //        return BadRequest(new { message = "Recipe is already in favorites." });
        //    }
        //    // Map DTO to entity
        //    var favorite = new RecipeFavorite
        //    {
        //        userId = request.userId,
        //        postId = request.postId
        //    };

        //    _context.Favorites.Add(favorite);
        //    _context.SaveChanges();

        //    return Ok(new { message = "Recipe added to favorites.", request });
        //}

        //[HttpPost("favorites/remove")]
        //public IActionResult RemoveFromFavorites([FromBody] RecipeFavoriteDTO request)
        //{
        //    var existingFavorite = _context.Favorites
        //        .FirstOrDefault(f => f.userId == request.userId && f.postId == request.postId);

        //    if (existingFavorite == null)
        //    {
        //        return NotFound(new { message = "Favorite not found." });
        //    }

        //    _context.Favorites.Remove(existingFavorite);
        //    _context.SaveChanges();

        //    return Ok(new { message = "Recipe removed from favorites." });
        //}




    }
}
