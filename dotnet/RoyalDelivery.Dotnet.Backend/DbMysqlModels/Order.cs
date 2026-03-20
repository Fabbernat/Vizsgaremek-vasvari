using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class Order
{
    public int Id { get; set; }

    public int RestaurantId { get; set; }

    public int UserId { get; set; }

    public DateTime Date { get; set; }
}
