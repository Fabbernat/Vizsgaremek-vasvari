import { useState, useEffect } from "react";
import type { User } from "../types/User";
import apiClient from "../api/apiClient";
import Table from "react-bootstrap/esm/Table";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const UserList = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const fetchUsers = () => {
    apiClient
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editedUser) return;

    apiClient
      .put(`/users/${editedUser.id}`, editedUser)
      .then(() => {
        toast.success("Felhasználó sikeresen frissítve!");
        fetchUsers();
        setIsEditing(false);
        setSelectedUser(editedUser);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Nem sikerült frissíteni a felhasználót!");
      });
  };

  const handleCancelEdit = () => {
    setEditedUser(selectedUser ? { ...selectedUser } : null);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setUserToDelete(selectedUser);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) return;

    apiClient
      .delete(`/users/${userToDelete.id}`)
      .then(() => {
        toast.success("Felhasználó törölve!");
        fetchUsers();
        handleCloseDeleteModal();
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Nem sikerült törölni a felhasználót!");
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Felhasználók</h1>
      <Table striped bordered hover data-bs-theme="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Felhasználónév</th>
            <th>Email</th>
            <th>Keresztnév</th>
            <th>Vezetéknév</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(user)}
            >
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        data-bs-theme="dark"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Felhasználó adatai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && editedUser && (
            <>
              {!isEditing ? (
                <div>
                  <div className="mb-3">
                    <strong>ID:</strong> {selectedUser.id}
                  </div>
                  <div className="mb-3">
                    <strong>Felhasználónév:</strong> {selectedUser.username}
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> {selectedUser.email}
                  </div>
                  <div className="mb-3">
                    <strong>Keresztnév:</strong> {selectedUser.firstName}
                  </div>
                  <div className="mb-3">
                    <strong>Vezetéknév:</strong> {selectedUser.lastName}
                  </div>
                </div>
              ) : (
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Felhasználónév
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Keresztnév
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={editedUser.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Vezetéknév
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={editedUser.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isEditing ? (
            <>
              <Button
                variant="primary"
                onClick={handleEdit}
                className="d-flex align-items-center gap-2"
              >
                <i className="bi bi-pencil-square"></i> Szerkesztés
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteClick}
                className="d-flex align-items-center gap-2"
              >
                <i className="bi bi-trash"></i> Törlés
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Bezárás
              </Button>
            </>
          ) : (
            <>
              <Button variant="success" onClick={handleSaveEdit}>
                Mentés
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                Mégse
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        data-bs-theme="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Felhasználó törlése</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Biztos, hogy ki akarod törölni ezt a felhasználót:
          <strong> {userToDelete?.username}</strong>?
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
          <Button variant="danger" onClick={confirmDeleteUser}>
            Törlés
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
