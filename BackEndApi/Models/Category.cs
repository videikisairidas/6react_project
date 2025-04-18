using System.ComponentModel.DataAnnotations;

namespace BackEndApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string? Name { get; set; }
        [MaxLength(10000)]
        public string? Description { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
