import db from "./db-connection.js";
import frontend from "./frontend-connection.js";

class Orders {
  sendOrdersFromDbToFrontend() {
    const orders = db.getOrders();
    frontend.displayOrders(orders);
  }
}

export default Orders;