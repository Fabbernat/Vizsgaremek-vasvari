import { exportCSV, exportJSON } from "./utils/export";
import type { meals } from "./stores/meals";
import type { restaurants } from "./stores/restaurants";
import type { orders } from "./stores/orders";
import type{ users } from "./stores/users";

export type ApplicantItem = {
};

type DashboardViewProps = {
  applicants: ApplicantItem[];
};

type DashboardProps = {
  meals: any[];
  restaurants: any[];
  orders: any[];
  users: any[];
};

export function DashboardView({meals,
  restaurants,
  orders,
  users,
   applicants }: DashboardViewProps) {
  return (
    <main>
    <h1>Dashboard</h1>
    <div className="dashboard">
      <h2>Statisztika</h2>

      <div className="stats-grid">
        <div>🍽️ Meals: {meals.length}</div>
        <div>🏬 Restaurants: {restaurants.length}</div>
        <div>📦 Orders: {orders.length}</div>
        <div>👤 Users: {users.length}</div>
      </div>
    </div>
    <div>
      <h2>Jelentkezők listája</h2>
      <button onClick={() => exportJSON(applicants, "applicants")}>
        Export JSON
      </button>

      <button onClick={() => exportCSV(applicants, "applicants")}>
        Export CSV
      </button>
    </div>
    </main>
  );
}

