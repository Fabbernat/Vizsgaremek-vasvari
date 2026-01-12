using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MyApp.Shared.ViewModels;

namespace MyApp.Desktop.ViewModels
{
    public partial class MainWindowViewModel : ObservableObject
    {
        private readonly StudentViewModel _studentViewModel= new StudentViewModel();
        private readonly SchoolClassViewModel _schoolClassViewModel = new SchoolClassViewModel();
        private readonly ControlPanelViewModel _controlPanelViewModel = new ControlPanelViewModel();

        [ObservableProperty]
        public object _currentView = new object();

        public MainWindowViewModel()
        {
            _currentView = _controlPanelViewModel;
        }

        [RelayCommand]
        private void ShowControlPanalView()
        {
            CurrentView = _controlPanelViewModel;
        }

        [RelayCommand]
        private void ShowStudentView()
        {
            CurrentView = _studentViewModel;
        }

        [RelayCommand]
        private void ShowSchoolClassView()
        {
            CurrentView = _schoolClassViewModel;
        }
    }
}
