using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Shared.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool Ordered { get; set; }

        public User() { }

        public User(int id, string username, string email, bool ordered)
        {
            Id = id;
            Username = username;
            Email = email;
            Ordered = ordered;
        }

        public override string ToString()
        {
            return $"{Id} {Username} {Email} - {Ordered}";
        }
    }
}
