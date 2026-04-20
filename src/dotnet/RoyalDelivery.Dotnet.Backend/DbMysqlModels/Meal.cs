using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class Meal
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public double Price { get; set; }

    public int RestaurantId { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}
