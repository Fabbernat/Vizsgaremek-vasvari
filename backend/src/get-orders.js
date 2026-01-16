import db from 'db.js';
import frontend from 'frontend.js';

class Orders {
    public void sendOrdersFromDbToFrontend() {
        const orders = db.getOrders();
        frontend.displayOrders(orders);
    }
}