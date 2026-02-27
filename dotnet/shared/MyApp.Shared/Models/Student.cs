namespace MyApp.Shared.Models
{
    /// <summary>
    /// Diák adatait tároló osztály.
    /// </summary>
    public class Student
    {
        /// <summary>
        /// A diák neve.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// A diák életkora.
        /// </summary>
        public int Age { get; set; }

        /// <summary>
        /// Az osztály, amelybe a diák jár.
        /// </summary>
        public string ClassName { get; set; } = string.Empty;

        public Student() { }

        public Student(string name, int age, string className)
        {
            Name = name;
            Age = age;
            ClassName = className;
        }

        public override string ToString() => $"{Name} ({Age}) – {ClassName}";
    }
}
