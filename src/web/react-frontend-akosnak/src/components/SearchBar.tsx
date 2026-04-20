import { Form, Col } from "react-bootstrap";
import "../styles/AllRestaurantStyle.css";

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  query,
  onQueryChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <Form
      data-bs-theme="dark"
      className="m-1 p-3 d-flex justify-content-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <Col xs={12} md={8} lg={6}>
        <h4>
          <i className="bi bi-search m-2"></i>
          Find what you need
        </h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control SearchBar"
            placeholder={placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
      </Col>
    </Form>
  );
};

export default SearchBar;
