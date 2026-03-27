using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace RoyalDelivery.Dotnet.Backend.Tests.Tests
{
    public class IntegrationTest1
    {
        private static readonly TimeSpan DefaultTimeout = TimeSpan.FromSeconds(30);

        //Instructions:
        // 1. Add a project reference to the target AppHost project, e.g.:

        //    <ItemGroup>
        //        <ProjectReference Include = "../MyAspireApp.AppHost/MyAspireApp.AppHost.csproj" />
        //    </ ItemGroup >

        // 2.Uncomment the following example test and update 'Projects.MyAspireApp_AppHost' to match your AppHost project:
        private readonly HttpClient _client;

        public IntegrationTest1(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetWebResourceRootReturnsOkStatusCode()
        {
            // Arrange
            var url = "/WeatherForecast";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
    }
}
