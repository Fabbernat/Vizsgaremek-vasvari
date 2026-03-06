import { useState } from "react";
import { exportCSV, exportJSON } from "./utils/export";

export type MealItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type MealViewProps = {
  meals: MealItem[];
};

export function MealView({ meals }: MealViewProps) {
  const [searchedItem, setSearchedItem] = useState("");
  const [mealsList, setMealsList] = useState<MealItem[]>(meals);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMeal, setEditMeal] = useState({
    name: "",
    description: "",
    price: 0
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const addMeal = (newMeal: { name: string; description: string; price: number }) => {
    setMealsList(prev => [
      ...prev,
      {
        id: Math.max(0, ...prev.map(meal => meal.id)) + 1,
        ...newMeal
      }
    ]);
  };

  const startEditing = (meal: MealItem) => {
    setEditingId(meal.id);
    setEditMeal({
      name: meal.name,
      description: meal.description,
      price: meal.price
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditMeal({
      name: "",
      description: "",
      price: 0
    });
  };

  const modifyMeal = (
    id: number,
    newMeal: { name: string; description: string; price: number }
  ) => {
    setMealsList(prev =>
      prev.map(meal =>
        meal.id === id ? { ...meal, ...newMeal } : meal
      )
    );

    cancelEditing();
  };

  const deleteMeal = (id: number) => {
    setMealsList(prev => prev.filter(meal => meal.id !== id));

    if (editingId === id) {
      cancelEditing();
    }
  };

  const deleteAll = () => {
    setMealsList([]);
    cancelEditing();
  };

  function handleSearch() {
    setMealsList(
      meals.filter(meal =>
        meal.name.toLowerCase().includes(searchedItem.toLowerCase())
      )
    );
  }

  return (
    <>
      <h1>Ételek listája</h1>

      <div className="search-container">
        <div>
          <label htmlFor="search" className="search">
            Keresés:
            <br />
            <input
              type="text"
              id="search"
              placeholder="Étel neve vagy leírása..."
              value={searchedItem}
              onChange={handleChange}
            />
            <button onClick={handleSearch}>🔍 Keresés</button>
            <button onClick={() => setMealsList(meals)}>
              Lista frissítése
            </button>
          </label>
        </div>

        {searchedItem !== "" && mealsList.length === 0 && (
          <div>
            <p>Nincs találat a következőre: {searchedItem}</p>
          </div>
        )}
      </div>

      <div className="list grid-cards">
        {mealsList.map((meal) => (
          <div
            key={meal.id}
            style={{ padding: "12px" }}
            className="currentView"
          >
            <h1>{meal.name}</h1>

            <ul>
              <li>Id: {meal.id}</li>
              <li>Leírás: {meal.description}</li>
              <li>Ár: {meal.price} Ft</li>
            </ul>

            <div className="modify">
              {editingId === meal.id ? (
                <>
                  <input
                    type="text"
                    value={editMeal.name}
                    onChange={(e) =>
                      setEditMeal({ ...editMeal, name: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    value={editMeal.description}
                    onChange={(e) =>
                      setEditMeal({ ...editMeal, description: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    value={editMeal.price}
                    onChange={(e) =>
                      setEditMeal({
                        ...editMeal,
                        price: Number(e.target.value)
                      })
                    }
                  />

                  <button onClick={() => modifyMeal(meal.id, editMeal)}>
                    Mentés
                  </button>
                  <button onClick={cancelEditing}>Mégse</button>
                </>
              ) : (
                <button onClick={() => startEditing(meal)}>
                  Módosítás
                </button>
              )}
            </div>

            <div className="delete">
              <button onClick={() => deleteMeal(meal.id)}>
                Törlés
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="add">
        <h1>Új étel hozzáadása</h1>

        {meals.length > 0 && (
          <div>
            <input placeholder={meals[0].name} />
            <input placeholder={meals[0].description} />
            <input placeholder={meals[0].price.toString()} />
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            addMeal({
              name: "Új étel",
              description: "Új leírás",
              price: 1000
            })
          }
        >
          Hozzáadás
        </button>
      </aside>

      <button onClick={() => exportJSON(mealsList, "meals")}>
        Export JSON
      </button>

      <button onClick={() => exportCSV(mealsList, "meals")}>
        Export CSV
      </button>

      <div className="delete">
        <button onClick={deleteAll}>Összes törlése</button>
      </div>
    </>
  );
}