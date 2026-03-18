using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class Shop
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
}
