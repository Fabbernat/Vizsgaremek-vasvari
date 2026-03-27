using System;
using System.Collections.Generic;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Address { get; set; } = null!;
    public string Role { get; internal set; }
    public string PasswordHash { get; internal set; }
}
