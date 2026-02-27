type DashboardProps = {
  meals: any[];
  restaurants: any[];
  orders: any[];
  users: any[];
};

export function DashboardView({
  meals,
  restaurants,
  orders,
  users
}: DashboardProps) {
  return (
    <div className="dashboard">
      <h1>Statisztika</h1>

      <div className="stats-grid">
        <div>Meals: {meals.length}</div>
        <div>Restaurants: {restaurants.length}</div>
        <div>Orders: {orders.length}</div>
        <div>Users: {users.length}</div>
      </div>
    </div>
  );
}