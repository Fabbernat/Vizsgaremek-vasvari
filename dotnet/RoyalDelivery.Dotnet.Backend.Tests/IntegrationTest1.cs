using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace RoyalDelivery.Dotnet.Backend.Tests.Tests
{
    public class IntegrationTest1 : IClassFixture<WebApplicationFactory<Program>>
    {
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