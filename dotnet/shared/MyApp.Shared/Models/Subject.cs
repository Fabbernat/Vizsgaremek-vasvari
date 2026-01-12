namespace MyApp.Shared.Models
{
    /// <summary>
    /// Tantárgy adatait tároló osztály.
    /// </summary>
    public class Subject
    {
        /// <summary>
        /// A tantárgy neve.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// A heti óraszám.
        /// </summary>
        public int WeeklyHours { get; set; }

        /// <summary>
        /// A tantárgy tanára.
        /// </summary>
        public string TeacherName { get; set; } = string.Empty;

        public Subject() { }

        public Subject(string name, int weeklyHours, string teacherName)
        {
            Name = name;
            WeeklyHours = weeklyHours;
            TeacherName = teacherName;
        }

        public override string ToString() => $"{Name} – {WeeklyHours} óra/hét (tanár: {TeacherName})";
    }
}
