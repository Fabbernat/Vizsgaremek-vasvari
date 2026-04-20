namespace RoyalDelivery.Dotnet.Backend.Dtos
{
    public class CreateShopDto
    {
        public string Name { get; set; } = null!;
        public int OwnerId { get; set; }
    }
}