namespace BackEndApi.DTO.dashboard
{
    public class ProductDto2
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } // Use nullable if description is optional
        public decimal Price { get; set; }
        public int? CategoryId { get; set; } // Foreign key
        public string? CategoryName { get; set; }
        public string? ImageUrl { get; set; }
    }
}
