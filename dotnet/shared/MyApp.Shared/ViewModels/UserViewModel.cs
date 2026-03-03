using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyApp.Shared.Repos;
using CommunityToolkit.Mvvm.Collections;
using CommunityToolkit.Mvvm.ComponentModel;
using System.Reflection.Metadata;
using MyApp.Shared.Models;
using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.Input;

namespace MyApp.Shared.ViewModels
{
    public partial class UserViewModel : ObservableObject
    {
        private readonly UserRepo _repos = new UserRepo();

        [ObservableProperty]
        [NotifyCanExecuteChangedFor(nameof(DeleteSelectedCommand))]
        private User? selectedUser;
        
        public ObservableCollection<User> Users { get; }
        public UserViewModel()
        {
            Users = new ObservableCollection<User>(_repos.GetAll());
        }

        [RelayCommand(CanExecute = nameof(CanDeleteSelected))]
        private void DeleteSelected()
        {
            if (selectedUser is null) return;
            
            _repos.Remove(selectedUser);
            Users.Remove(selectedUser);
            selectedUser = null;
        }

        private bool CanDeleteSelected()
        {
            return true;
        }
    }
}
