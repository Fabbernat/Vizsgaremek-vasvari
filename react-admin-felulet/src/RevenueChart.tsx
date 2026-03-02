import "./RevenueChart.css";

type Order = {
  id: number;
  totalPrice: number;
};

type Props = {
  orders: Order[];
};

export function RevenueChart({ orders }: Props) {
  const max = Math.max(...orders.map(o => o.totalPrice), 1);

  return (
    <div className="chart" >
      <h2>Bevétel alakulása</h2>

      <div className="bars">
        {orders.map(order => {
          const height = (order.totalPrice / max) * 200;

          return (
            <div key={order.id} className="bar-wrapper">
              <div
                className="bar"
                style={{ height: `${height}px` }}
                title={`${order.totalPrice} Ft`}
              />
              <span className="bar-label">
                {order.totalPrice} Ft
              </span>
            </div>
          );
        })}
      </div>

      <h3>
        Összes bevétel:{" "}
        {orders.reduce((sum, o) => sum + o.totalPrice, 0)} Ft
      </h3>
    </div>
  );
}