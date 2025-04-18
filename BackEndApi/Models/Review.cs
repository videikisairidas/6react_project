﻿using System.ComponentModel.DataAnnotations;

namespace BackEndApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string AuthorName { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Product Product { get; set; }
    }
}
