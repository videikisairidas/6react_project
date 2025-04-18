using BackEndApi.Data;
using BackEndApi.DTO.shop;
using BackEndApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEndApi.Controllers.dashboard
{
    [ApiController]
    [Route("api/dashboard/[controller]")]
    //[ApiExplorerSettings(GroupName = "v1")]
    [Tags("Dashboard - 4 Reviews")]
    public class ReviewsController : Controller
    {
        private readonly ShopDbContext _context;

        //private readonly IConfiguration _configuration;

        public ReviewsController(ShopDbContext context)
        {
            _context = context;
            //_configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetProductReviews(int productId)
        {
            var reviews = await _context.Reviews
                                        .Where(r => r.ProductId == productId)
                                        .ToListAsync();
            return reviews;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return review;
        }

        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(int productId, ReviewDto reviewDto)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            var review = new Review
            {
                ProductId = productId,
                AuthorName = reviewDto.AuthorName,
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }
}
