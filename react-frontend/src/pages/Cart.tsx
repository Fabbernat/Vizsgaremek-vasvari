import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  // pizzák betöltése az API-ról
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((response) => setPizzak(response.data))
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, []);

  // kosár betöltése localStorage-ból vagy üres tömb, ha nincs
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
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
              <th>Ár</th>
              <th>Törlés</th>
            </thead>
            <tbody>
              {kosar.map((id, index) => {
                const pizza = pizzak.find((p) => p.id == id);

                return (
                  <tr>
                    <td>{pizza?.nev}</td>
                    <td>{pizza?.ar} Ft</td>
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
