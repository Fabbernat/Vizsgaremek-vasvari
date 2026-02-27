using Microsoft.Extensions.Logging;
using MyApp.Shared.Repos;
using MyApp.Shared.ViewModels;
using MyApp.Maui.Views;

namespace MyApp.Maui;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});
        // Shell regisztráció
        builder.Services.AddSingleton<AppShell>();
        // Repo, view és view model
        builder.Services.AddSingleton<SchoolClassRepo>();
        builder.Services.AddTransient<SchoolClassViewModel>();
        builder.Services.AddTransient<SchoolClassesPage>();
#if DEBUG
        builder.Logging.AddDebug();
#endif

		return builder.Build();
	}
}
