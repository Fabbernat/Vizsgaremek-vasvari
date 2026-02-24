using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Shared.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public DateTime Opened { get; set; }

        public Restaurant() { }
        public Restaurant(int id, string name, string owner, DateTime opened)
        {
            Id = id;
            Name = name;
            Owner = owner;
            Opened = opened;
        }

        public override string ToString()
        {
            return $"{Id}. {Name} - {Owner} - {Opened}";
        }
    }
}
