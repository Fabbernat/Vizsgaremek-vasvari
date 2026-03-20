namespace RoyalDelivery.Dotnet.Backend.Dtos
{
    public class CreateOwnerDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int UserId { get; set; }
    }
}