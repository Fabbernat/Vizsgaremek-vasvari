namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels
{
    public partial class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int MealId { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }

        public virtual Order Order { get; set; } = null!;
        public virtual Meal Meal { get; set; } = null!;
    }
}
