namespace RoyalDelivery.Dotnet.Backend.Dtos
{
    public class CreateRestaurantDto
    {
        public string Name { get; set; } = null!;
        public int OwnerId { get; set; }
    }
}