using BackEndApi.Data;
using BackEndApi.DTO.dashboard;
using BackEndApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;

namespace BackEndApi.Controllers.dashboard
{
    [ApiController]
    [Route("api/dashboard/[controller]")]
    //[ApiExplorerSettings(GroupName = "v1")]
    [Tags("Dashboard - 2 Products")]
    public class ProductsController : Controller
    {
        private readonly ShopDbContext _context;

        //private readonly IConfiguration _configuration;

        public ProductsController(ShopDbContext context)
        {
            _context = context;
            //_configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto2>>> GetProducts()
        {
            //return await _context.Products.Include(p => p.Category).ToListAsync();
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            var productDtos = products.Select(p => new ProductDto2
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                CategoryId = p.CategoryId,
                CategoryName = p.Category?.Name,
                ImageUrl = p.ImageUrl
            }).ToList();
            return Ok(productDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Category).Include(p => p.Reviews).FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(int categoryId)
        {
            return await _context.Products.Where(p => p.CategoryId == categoryId).Include(p => p.Category).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                StockQuantity = productDto.StockQuantity,
                CategoryId = productDto.CategoryId,
                ImageUrl = productDto.ImageUrl
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductDto productDto)
        {
            if (id != productDto.Id) // Assuming ProductDto might optionally contain the Id
            {
                return BadRequest();
            }

            var productToUpdate = await _context.Products.FindAsync(id);
            if (productToUpdate == null)
            {
                return NotFound();
            }

            productToUpdate.Name = productDto.Name;
            productToUpdate.Description = productDto.Description;
            productToUpdate.Price = productDto.Price;
            productToUpdate.StockQuantity = productDto.StockQuantity;
            productToUpdate.CategoryId = productDto.CategoryId;
            productToUpdate.ImageUrl = productDto.ImageUrl;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ProductExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }


        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] string? search,      // Product name search
            [FromQuery] int? category,    // Category filter
            [FromQuery] decimal? minPrice,   // Minimum price filter
            [FromQuery] decimal? maxPrice)   // Maximum price filter
        {
            // Start with the base query
            IQueryable<Product> query = _context.Products;

            // Apply search filter (case-insensitive)
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => EF.Functions.Like(p.Name, $"%{search}%"));
            }

            // Apply category filter (case-insensitive)
            if (category > 0) 
            //if (!int..IsNullOrEmpty(category))
            {
                //Console.WriteLine(category);
                query = query.Where(p => p.Category.Id == category);
            }

            // Apply minimum price filter
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            // Apply maximum price filter
            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            var products = await query.ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound("No products found matching the criteria.");
            }

            return Ok(products);
        }



    }
}
