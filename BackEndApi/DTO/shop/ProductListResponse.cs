using BackEndApi.Models;
using System.Collections.Generic;

namespace BackEndApi.DTO.shop
{
    public class ProductListResponse
    {
        public List<Product> Products { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; } // Optional: Good to return
        public int PageSize { get; set; }    // Optional: Good to return
        public int TotalCount { get; set; }  // Optional: Good to return
    }
}
