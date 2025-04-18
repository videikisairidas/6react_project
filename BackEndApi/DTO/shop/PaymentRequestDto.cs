namespace BackEndApi.DTO.shop
{
    public class PaymentRequestDto
    {
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
    }
}
