using MyApp.Shared.Models;

namespace MyApp.Shared.Repos
{
    /// <summary>
    /// Repo az iskolai osztályok tárolására
    /// </summary>
    public class SchoolClassRepo
    {
        /// <summary>
        /// Memóriában tárolt iskolai osztályok (tesztadatok)
        /// </summary>
        private List<SchoolClass> _items = new()
        {
            new SchoolClass(9,"a", 26),
            new SchoolClass(9,"b", 0),
            new SchoolClass(9,"c", 24)
        };

        /// <summary>
        /// Összes iskolai osztály csak olvasható listáját visszaadó metódus
        /// </summary>
        /// <returns></returns>
        public IReadOnlyList<SchoolClass> GetAll()
        {
            return _items.ToList();
        }

        /// <summary>
        /// Iskolai osztály törlése
        /// </summary>
        /// <param name="schoolClass">A törlendő iskolai osztály</param>
        public void Remove(SchoolClass schoolClass)
        {
            _items.Remove(schoolClass);
        }
    }
}
