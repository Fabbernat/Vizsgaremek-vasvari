import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import type { Meals } from "../types/Meals";
import { toast } from "react-toastify";
import { Button, Card, Container } from "react-bootstrap";

// EditMeal component for editing meal details
const EditMeal = () => {
  const { id } = useParams();

  const [meal, setMeal] = useState<Meals | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/meals/${id}`)
      .then((response) => {
        setMeal(response.data.data);
      })
      .catch((error) => {
        console.error(
          "A proplem has occured while fetching meal details:",
          error,
        );
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (meal) {
      setMeal({ ...meal, [e.target.name]: e.target.value });
      console.log("Updated meal state:", {
        ...meal,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (meal) {
      console.log(meal);
      apiClient
        .put(`/meals/${id}`, meal)
        .then(() => {
          toast.success("Meal updated successfully!");
          navigate("/meals/" + id);
        })
        .catch((error) => {
          console.error(
            "A problem has occured while updating the meal:",
            error,
          );
          toast.error("Failed to update meal. Please try again.");
        });
    }
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="mt-4" data-bs-theme="dark">
        <Card>
          <Card.Body>
            <Card.Title>Edit Meal</Card.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={meal.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={meal.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={meal.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button variant="primary" type="submit">
                Update Meal
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default EditMeal;
