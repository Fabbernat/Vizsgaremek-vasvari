namespace RoyalDelivery.Dotnet.Backend.Dtos
{
    public class CreateOrderDto
    {
        public int RestaurantId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
