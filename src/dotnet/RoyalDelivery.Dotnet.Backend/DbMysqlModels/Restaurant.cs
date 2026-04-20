using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class Restaurant
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int OwnerId { get; set; }
}
