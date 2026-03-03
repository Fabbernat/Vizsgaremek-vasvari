using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyApp.Shared.Models;

namespace MyApp.Shared.Repos
{
    public class RestaurantRepo
    {
        private List<Restaurant> _items = new()
        {
            new Restaurant(1,"McDonald's","Ferike",DateTime.Today.AddMonths(-50)),
            new Restaurant(2,"KFC","Sándor",DateTime.Today.AddMonths(-40)),
            new Restaurant(3,"Burgerking","Róbert",DateTime.Today.AddMonths(-30)),
            new Restaurant(4,"Wendy's", "Tamás", DateTime.Today.AddMonths(-60))
        };

        public IReadOnlyList<Restaurant> GetAll()
        {
            return _items.ToList();
        }

        public void Remove(Restaurant restaurant)
        {
            _items.Remove(restaurant);
        }
    }
}
