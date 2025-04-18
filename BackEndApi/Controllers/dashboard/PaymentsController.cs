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
    [Tags("Dashboard - 5 payments")]
    public class PaymentsController : Controller
    {
        private readonly ShopDbContext _context;

        //private readonly IConfiguration _configuration;

        public PaymentsController(ShopDbContext context)
        {
            _context = context;
            //_configuration = configuration;
        }
        [HttpGet]
        public async Task<ActionResult<Payment>> GetPayment(int orderId)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.OrderId == orderId);
            if (payment == null)
            {
                return NotFound();
            }
            return payment;
        }

        [HttpPost]
        public async Task<ActionResult<PaymentResponseDto>> PostPayment(int orderId, PaymentRequestDto paymentRequestDto)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return NotFound("Order not found.");
            }

            // In a real application, you would integrate with a payment gateway here.
            // This is a simplified example.

            var payment = new Payment
            {
                OrderId = orderId,
                PaymentDate = DateTime.UtcNow,
                Amount = paymentRequestDto.Amount,
                PaymentMethod = paymentRequestDto.PaymentMethod,
                TransactionId = Guid.NewGuid().ToString(), // Simulate transaction ID
                PaymentStatus = "Pending" // Initial status
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Simulate processing (in a real scenario, this would involve the payment gateway)
            // For simplicity, we'll just mark it as completed after a short delay.
            await Task.Delay(2000);
            payment.PaymentStatus = "Completed";
            await _context.SaveChangesAsync();

            return Ok(new PaymentResponseDto
            {
                TransactionId = payment.TransactionId,
                PaymentStatus = payment.PaymentStatus,
                Message = "Payment processed successfully (simulated)."
            });
        }

        // Updating and deleting payments might have specific business rules
        // For example, you might not be able to delete a completed payment

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPayment(int id, PaymentRequestDto paymentRequestDto)
        //{
        //    if (id != paymentRequestDto.Id) // Assuming PaymentRequestDto might optionally contain the Id
        //    {
        //        return BadRequest();
        //    }

        //    var paymentToUpdate = await _context.Payments.FindAsync(id);
        //    if (paymentToUpdate == null)
        //    {
        //        return NotFound();
        //    }

        //    paymentToUpdate.Amount = paymentRequestDto.Amount;
        //    paymentToUpdate.PaymentMethod = paymentRequestDto.PaymentMethod
        //    if (paymentToUpdate.PaymentStatus.ToLower() != "completed")
        //    {
        //        paymentToUpdate.Amount = paymentRequestDto.Amount;
        //        paymentToUpdate.PaymentMethod = paymentRequestDto.PaymentMethod;

        //        try
        //        {
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException) when (!PaymentExists(id))
        //        {
        //            return NotFound();
        //        }

        //        return NoContent();
        //    }
        //    else
        //    {
        //        return BadRequest("Cannot update a completed payment.");
        //    }
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            // You might have business rules preventing deletion of certain payment statuses
            if (payment.PaymentStatus.ToLower() != "completed")
            {
                _context.Payments.Remove(payment);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return BadRequest("Cannot delete a completed payment.");
            }
        }

        private bool PaymentExists(int id)
        {
            return _context.Payments.Any(e => e.Id == id);
        }
    }
}
