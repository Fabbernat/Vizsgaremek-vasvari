using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace MyApp.Maui.ViewModels
{
    /// <summary>
    /// A fő ViewModel, amely a navigációs parancsokat kezeli.
    /// Ez irányítja a programot a Vezérlőpult, Diákok és Osztályok oldalak között.
    /// </summary>
    public partial class MainViewModel : ObservableObject
    {
        /// <summary>
        /// Navigáció a Vezérlőpult oldalra.
        /// </summary>
        [RelayCommand]
        private async Task GoToStudentsAsync()
        {
            await Shell.Current.GoToAsync("//main/students");
        }

        /// <summary>
        /// Navigáció a Diákok oldalra.
        /// </summary>
        [RelayCommand]
        private async Task GoToClassesAsync()
        {
            await Shell.Current.GoToAsync("//main/classes");
        }

        /// <summary>
        /// Navigáció az Osztályok oldalra.
        /// </summary>
        [RelayCommand]
        private async Task GoToControlPanelAsync()
        {
            await Shell.Current.GoToAsync("//main/controlpanel");
        }
    }
}
