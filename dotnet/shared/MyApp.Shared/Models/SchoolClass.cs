namespace MyApp.Shared.Models
{
    /// <summary>
    /// Iskolai osztály.
    /// </summary>
    public class SchoolClass
    {
        /// <summary>
        /// Az osztály évfolyama (pl. 9, 10, 11, 12).
        /// </summary>
        public int Grade { get; set; }

        /// <summary>
        /// Az osztály betűjele (pl. "a", "b", "c").
        /// </summary>
        public string Section { get; set; } = string.Empty;

        public string Name => $"{Grade}.{Section}";

        /// <summary>
        /// Az osztályban tanuló diákok száma.
        /// </summary>
        public int StudentCount { get; set; }
        
        // Üres konstruktor
        public SchoolClass()
        {
        }

        // Paraméteres konstruktor
        public SchoolClass(int grade, string section, int studentCount)
        {
            Grade = grade;
            Section = section;
            StudentCount = studentCount;
        }

        // Barátságos megjelenítés
        public override string ToString()
        { 
            return $"{Grade}.{Section} – {StudentCount} fő";
        }
    }
}
