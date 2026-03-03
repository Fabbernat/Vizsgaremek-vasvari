using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyApp.Shared.Models;

namespace MyApp.Shared.Repos
{
    public class UserRepo
    {
        private List<User> _items = new()
        {
            new User(1, "Tomtom22", "Tomika@gmail.com", false),
            new User(2, "Rebekaaaa", "Rebi@gmail.com", true)
        };

        public IReadOnlyList<User> GetAll()
        {
            return _items.ToList();
        }

        public void Remove( User user )
        {
            _items.Remove(user);
        }
    }
}
