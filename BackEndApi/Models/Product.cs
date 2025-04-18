//using BackEndApi.Models;

namespace BackEndApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryId { get; set; } // Foreign key
        public Category Category { get; set; } // Navigation property
        public string? ImageUrl { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}