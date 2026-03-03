import { Container, Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "./AllRestaurantStyle.css";
import { toast } from "react-toastify";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "The Golden Artichoke" },
    { id: 2, name: "Midnight Ramen Bar" },
    { id: 3, name: "Blue Wave Seafood" },
    { id: 4, name: "Terracotta Kitchen" },
    { id: 5, name: "Urban Forge Steakhouse" },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function handleCheckboxChange(id) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  // CREATE
  function CreateRest() {
    if (newName.trim() === "") {
      toast.error("Name cannot be empty!");
      return;
    }

    const newRestaurant = {
      id:
        restaurants.length > 0
          ? Math.max(...restaurants.map((r) => r.id)) + 1
          : 1,
      name: newName,
    };

    setRestaurants([...restaurants, newRestaurant]);
    setNewName("");
    setShowCreate(false);
    toast.success("Restaurant created!");
  }

  // DELETE
  function DeleteRest() {
    if (selectedIds.length === 0) {
      toast.error("Select at least one item!");
      return;
    }

    setRestaurants(restaurants.filter((r) => !selectedIds.includes(r.id)));
    setSelectedIds([]);
    toast.success("Deleted successfully!");
  }

  // MODIFY
  function ModifyRest() {
    if (selectedIds.length !== 1) {
      toast.error("Select exactly ONE item to modify!");
      return;
    }

    if (editName.trim() === "") {
      toast.error("Modified name cannot be empty!");
      return;
    }

    setRestaurants(
      restaurants.map((r) =>
        r.id === selectedIds[0] ? { ...r, name: editName } : r,
      ),
    );

    setEditName("");
    setSelectedIds([]);
    setShowEdit(false);
    toast.success("Modified successfully!");
  }

  function openEditModal() {
    if (selectedIds.length !== 1) {
      toast.error("Select exactly ONE item to modify!");
      return;
    }

    const selectedRestaurant = restaurants.find((r) => r.id === selectedIds[0]);

    setEditName(selectedRestaurant.name);
    setShowEdit(true);
  }

  return (
    <Container className="ListStyle">
      <h1>Our Featured Restaurants</h1>

      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name}
            <input
              id="SelectedData"
              type="checkbox"
              checked={selectedIds.includes(restaurant.id)}
              onChange={() => handleCheckboxChange(restaurant.id)}
            />
          </li>
        ))}
      </ul>

      <div className="BtnDiv">
        <button className="Btn" onClick={() => setShowCreate(true)}>
          CREATE
        </button>

        <button className="Btn" onClick={DeleteRest}>
          DELETE
        </button>

        <button className="Btn" onClick={openEditModal}>
          MODIFY
        </button>
      </div>

      {/* CREATE MODEL */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Restaurant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="New restaurant name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={CreateRest}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODIFY MODEL */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Restaurant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Modified name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={ModifyRest}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RestaurantList;
