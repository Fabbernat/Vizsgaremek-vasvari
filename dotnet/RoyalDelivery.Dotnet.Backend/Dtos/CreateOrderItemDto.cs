namespace RoyalDelivery.Dotnet.Backend.Dtos
{
    public class CreateOrderItemDto
    {
        public int OrderId { get; set; }
        public int MealId { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
    }
}