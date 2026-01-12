using MyApp.Shared.ViewModels;

namespace MyApp.Maui.Views;

public partial class SchoolClassesPage : ContentPage
{
    private readonly SchoolClassViewModel _schoolClassViewModel;
    public SchoolClassesPage(SchoolClassViewModel schoolClassViewModel)
	{
		InitializeComponent();
		_schoolClassViewModel = schoolClassViewModel;
		BindingContext = _schoolClassViewModel;
	}
}