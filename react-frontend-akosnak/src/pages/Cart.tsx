/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../store/store";
import type { Restaurant } from "../types/Restaurant";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  useEffect(() => {
    apiClient
      .get("/restaurants")
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, []);

  // kosár betöltése localStorage-ból vagy üres tömb, ha nincs
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]"),
  );

  // ha a kosár változik (új elem, törlés, kiürítés), akkor elmentjük a localStorage-ba
  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, [kosar]);

  // elem törlése a kosárból index alapján
  const removeItem = (searchedIndex: number) => {
    setKosar(kosar.filter((v, i) => i !== searchedIndex));
  };

  return (
    <>
      <h1>Kosár tartalma</h1>
      {kosar.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <th>Név</th>
              <th>Törlés</th>
            </thead>
            <tbody>
              {kosar.map((id, index) => {
                const restaurant = restaurants.find((p) => p.id == id);

                return (
                  <tr>
                    <td>{restaurant?.name}</td>
                    <td>
                      <Button
                        onClick={() => removeItem(index)}
                        variant="danger"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button onClick={() => setKosar([])} variant="warning">
            Kiürítés
          </Button>
        </>
      ) : (
        <h2>A kosár tartalma üres</h2>
      )}
    </>
  );
};

export default Cart;
