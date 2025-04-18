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
    [Tags("Dashboard - 3 Orders")]
    public class OrdersController : Controller
    {
        private readonly ShopDbContext _context;

        //private readonly IConfiguration _configuration;

        public OrdersController(ShopDbContext context)
        {
            _context = context;
            //_configuration = configuration;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderRequestDto orderRequestDto)
        {
            var order = new Order
            {
                OrderDate = DateTime.UtcNow,
                CustomerName = orderRequestDto.CustomerName,
                CustomerEmail = orderRequestDto.CustomerEmail,
                ShippingStreet = orderRequestDto.ShippingStreet,
                ShippingCity = orderRequestDto.ShippingCity,
                ShippingState = orderRequestDto.ShippingState,
                ShippingZipCode = orderRequestDto.ShippingZipCode,
                ShippingCountry = orderRequestDto.ShippingCountry,
                BillingStreet = orderRequestDto.BillingStreet,
                BillingCity = orderRequestDto.BillingCity,
                BillingState = orderRequestDto.BillingState,
                BillingZipCode = orderRequestDto.BillingZipCode,
                BillingCountry = orderRequestDto.BillingCountry,
                OrderItems = orderRequestDto.OrderItems?.Select(itemDto => new OrderItem
                {
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity
                    // You might want to fetch the product price here
                }).ToList() ?? new List<OrderItem>()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            await _context.Entry(order).Collection(o => o.OrderItems).LoadAsync();
            foreach (var item in order.OrderItems)
            {
                await _context.Entry(item).Reference(oi => oi.Product).LoadAsync();
            }

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
