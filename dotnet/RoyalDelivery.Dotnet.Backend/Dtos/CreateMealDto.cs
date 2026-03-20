namespace RoyalDelivery.Dotnet.Backend.Dtos
{
    public class CreateMealDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Price { get; set; }
        public int RestaurantId { get; set; }
    }
}
