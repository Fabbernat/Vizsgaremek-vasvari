using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MyApp.Shared.Models;
using MyApp.Shared.Repos;
using System.Collections.ObjectModel;

namespace MyApp.Shared.ViewModels
{
    /// <summary>
    /// MainViewModel a View-n megjelenendő adatokat és interakciókat kezeli
    /// </summary>
    public partial class SchoolClassViewModel : ObservableObject
    {
        /// <summary>
        /// A ViewModel-nek része a repo, így eléri a repóban lévő adatokat
        /// </summary>
        private readonly SchoolClassRepo _repo = new SchoolClassRepo();

        /// <summary>
        /// Az az iskolai osztály, amit a MainWindows ListView-ban a felhasználó kijelöl. CommunityToolkit elkészíti a get/set-es SelectedClass-t
        /// </summary>
        [ObservableProperty]
        [NotifyCanExecuteChangedFor(nameof(DeleteSelectedCommand))]
        private SchoolClass? selectedClass;

        /// <summary>
        /// Hogy a View-n megjelenjenek az iskolai osztályok, a ViewModel biztosít egy property-t
        /// </summary>
        public ObservableCollection<SchoolClass> Classes { get; }

        public SchoolClassViewModel()
        {
            // Az iskolai osztályok a repóból kerülnek betöltésre
            Classes = new ObservableCollection<SchoolClass>(_repo.GetAll());
        }

        [RelayCommand(CanExecute = nameof(CanDeleteSelected))]
        private void DeleteSelected()
        {
            if (SelectedClass is null) return;

            _repo.Remove(SelectedClass);
            Classes.Remove(SelectedClass);
            SelectedClass = null;
        }

        /// <summary>
        /// Megadja mikor lehet törölni az osztályt
        /// </summary>
        /// <returns>true ha az osztály létszáma nulla, vagyis ha nincs diák az osztályba</returns>
        private bool CanDeleteSelected()
        {
            return true;
        }
    }
}
