namespace MyApp.Shared.Models
{
    /// <summary>
    /// Szülő adatait tároló osztály.
    /// </summary>
    public class Parent
    {
        /// <summary>
        /// A szülő neve.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// A gyermek neve.
        /// </summary>
        public string ChildName { get; set; } = string.Empty;

        /// <summary>
        /// Kapcsolattartási telefonszám.
        /// </summary>
        public string PhoneNumber { get; set; } = string.Empty;

        public Parent() { }

        public Parent(string name, string childName, string phoneNumber)
        {
            Name = name;
            ChildName = childName;
            PhoneNumber = phoneNumber;
        }

        public override string ToString() => $"{Name} (gyermek: {ChildName}) – Tel: {PhoneNumber}";
    }
}
