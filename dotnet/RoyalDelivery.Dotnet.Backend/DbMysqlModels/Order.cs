using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class Order
{
    public int Id { get; set; }

    public string RestaurantId { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public string Date { get; set; } = null!;
}
