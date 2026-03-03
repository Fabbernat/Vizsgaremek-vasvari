using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.Collections;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MyApp.Shared.Models;
using MyApp.Shared.Repos;

namespace MyApp.Shared.ViewModels
{
    public partial class RestaurantViewModel: ObservableObject
    {
        private readonly RestaurantRepo _repo = new RestaurantRepo();

        [ObservableProperty]
        [NotifyCanExecuteChangedFor(nameof(DeleteSelectedCommand))]
        private Restaurant selectedRestaurant;

        public ObservableCollection<Restaurant> Restaurants { get; }

        public RestaurantViewModel()
        {
            Restaurants = new ObservableCollection<Restaurant>(_repo.GetAll());
        }

        [RelayCommand(CanExecute = nameof(CanDeleteSelected))]
        private void DeleteSelected()
        {
            if (selectedRestaurant is null) return;
            
            _repo.Remove(selectedRestaurant);
            Restaurants.Remove(selectedRestaurant);
            selectedRestaurant = null;
        }

        private bool CanDeleteSelected()
        {
            return true;
        }
    }
}
