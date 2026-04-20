using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class Owner
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int UserId { get; set; }
}
