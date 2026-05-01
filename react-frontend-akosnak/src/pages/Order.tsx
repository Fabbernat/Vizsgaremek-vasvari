import { useEffect, useState } from "react";
import type { Orders } from "../types/Orders.ts";
import type { Restaurant } from "../types/Restaurant.ts";
import type { User } from "../types/User.ts";
import apiClient from "../api/apiClient";
import {
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

type RawOrder = Orders & {
  restaurantid?: number;
  userid?: number;
  restaurant_id?: number;
  user_id?: number;
};

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.valueOf())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");

  return `${year}.${month}.${day}. ${hour}:00`;
};

const formatPayment = (payment: string | number) => {
  const num = typeof payment === "string" ? parseFloat(payment) : payment;
  return new Intl.NumberFormat("hu-HU").format(num);
};

const normalizeOrder = (order: RawOrder): Orders => ({
  ...order,
  restaurantId:
    order.restaurantId ?? order.restaurantid ?? order.restaurant_id ?? 0,
  userId: order.userId ?? order.userid ?? order.user_id ?? 0,
  status: order.status || "pending",
});

const getStatusColor = (status?: string) => {
  switch (status) {
    case "completed":
      return "#28a745";
    case "cancelled":
      return "#dc3545";
    case "pending":
    default:
      return "#ffc107";
  }
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case "completed":
      return "Teljesítve";
    case "cancelled":
      return "Megszakítva";
    case "pending":
    default:
      return "Függőben";
  }
};

const Order = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Orders | null>(null);

  useEffect(() => {
    Promise.all([
      apiClient.get<RawOrder[]>("/orders"),
      apiClient.get<Restaurant[]>("/restaurants"),
      apiClient.get<User[]>("/users"),
    ])
      .then(([ordersRes, restaurantsRes, usersRes]) => {
        setOrders(ordersRes.data.map(normalizeOrder));
        setRestaurants(restaurantsRes.data);
        setUsers(usersRes.data);
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
        setError("Nem sikerült betölteni a rendeléseket.");
      })
      .finally(() => setLoading(false));
  }, []);

  const getRestaurantName = (restaurantId: number) => {
    const restaurant = restaurants.find((item) => item.id === restaurantId);
    return restaurant?.name ?? `Restaurant #${restaurantId}`;
  };

  const getUserName = (userId: number) => {
    const user = users.find((item) => item.id === userId);
    if (!user) return `User #${userId}`;
    return user.username || `${user.firstName} ${user.lastName}`;
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    apiClient
      .patch(`/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: newStatus as "pending" | "completed" | "cancelled",
                }
              : order,
          ),
        );
        toast.success("Státusz frissítve!");
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        toast.error("Nem sikerült frissíteni a státuszt.");
      });
  };

  const handleDeleteClick = (order: Orders) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const confirmDeleteOrder = () => {
    if (!orderToDelete) return;

    apiClient
      .delete(`/orders/${orderToDelete.id}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderToDelete.id),
        );
        toast.success("Rendelés törölve!");
        handleCloseDeleteModal();
      })
      .catch((err) => {
        console.error("Error deleting order:", err);
        toast.error("Nem sikerült törölni a rendelést.");
      });
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-4">{error}</Container>;
  }

  if (orders.length === 0) {
    return <Container className="mt-4">Nincsenek rendeléseid.</Container>;
  }

  return (
    <Container className="mt-4 mb-4">
      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
        {orders.map((order) => (
          <Col key={order.id}>
            <Card
              className="h-100"
              data-bs-theme="dark"
              style={{ position: "relative" }}
            >
              <Button
                variant="close"
                onClick={() => handleDeleteClick(order)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  zIndex: 10,
                }}
                aria-label="Rendelés törlése"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-3">Rendelés #{order.id}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  <div className="mb-2">
                    {getRestaurantName(order.restaurantId)}
                  </div>
                  <div>{getUserName(order.userId)}</div>
                </Card.Subtitle>
                <div className="flex-grow-1 mb-3">
                  <div className="mb-5">
                    <strong>Dátum:</strong> {formatOrderDate(order.date)}
                  </div>
                  <div>
                    <strong>Fizetendő:</strong>{" "}
                    <h4 className="mt-2">{formatPayment(order.payment)}Ft</h4>
                  </div>
                </div>
                <Form.Group className="mt-3">
                  <Form.Select
                    size="sm"
                    value={order.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Függőben</option>
                    <option value="completed">Teljesítve</option>
                    <option value="cancelled">Megszakítva</option>
                  </Form.Select>
                </Form.Group>
                <div
                  className="mt-3 pt-3 text-center"
                  style={{
                    borderTop: `1px solid ${getStatusColor(order.status)}`,
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: getStatusColor(order.status),
                    }}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        data-bs-theme="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Rendelés törlése</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Biztosan törölni szeretnéd ezt a rendelést?
          <div className="mt-2">
            <strong>Order #{orderToDelete?.id}</strong>
          </div>
          <div>
            {orderToDelete && getRestaurantName(orderToDelete.restaurantId)}
          </div>
          <div>{orderToDelete && getUserName(orderToDelete.userId)}</div>
        </Modal.Body>
        <Modal.Body>
          <Alert variant="danger">
            <i className="bi bi-exclamation-circle me-3"></i>A törlés nem
            vonható vissza!
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Mégse
          </Button>
          <Button variant="danger" onClick={confirmDeleteOrder}>
            Törlés
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Order;
