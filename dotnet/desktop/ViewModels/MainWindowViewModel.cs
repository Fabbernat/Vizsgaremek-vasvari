using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MyApp.Shared.ViewModels;

namespace MyApp.Desktop.ViewModels
{
    public partial class MainWindowViewModel : ObservableObject
    {
        private readonly RestaurantViewModel _restaurantViewModel= new RestaurantViewModel();
        private readonly SchoolClassViewModel _schoolClassViewModel = new SchoolClassViewModel();
        private readonly UserViewModel _userViewModel = new UserViewModel();
        

        [ObservableProperty]
        public object _currentView = new object();

        [RelayCommand]
        private void ShowRestaurantView()
        {
            CurrentView = _restaurantViewModel;
        }

        [RelayCommand]
        private void ShowUserView()
        {
            CurrentView = _userViewModel;
        }

        [RelayCommand]
        private void ShowSchoolClassView()
        {
            CurrentView = _schoolClassViewModel;
        }
    }
}
