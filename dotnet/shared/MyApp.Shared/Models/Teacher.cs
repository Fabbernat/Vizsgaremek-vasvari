namespace MyApp.Shared.Models
{
    /// <summary>
    /// Tanár adatait tároló osztály.
    /// </summary>
    public class Teacher
    {
        /// <summary>
        /// A tanár neve.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// A tanított tantárgy.
        /// </summary>
        public string Subject { get; set; } = string.Empty;

        /// <summary>
        /// Az oktatásban eltöltött évek száma.
        /// </summary>
        public int ExperienceYears { get; set; }

        public Teacher() { }

        public Teacher(string name, string subject, int experienceYears)
        {
            Name = name;
            Subject = subject;
            ExperienceYears = experienceYears;
        }

        public override string ToString() => $"{Name} – {Subject} ({ExperienceYears} év tapasztalat)";
    }
}
