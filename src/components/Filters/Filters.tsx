import { Button, Form } from "react-bootstrap";
import "./filters.scss";
import Rating from "../Rating/Rating";
import { CartState } from "../../Context/Context";

const Filters: React.FC = () => {
  const {
    stateProduct: { byStock, byFastDelivery, byRating, searchQuery, sort },
    dispatchProduct,
  } = CartState();

  console.log(byStock, byFastDelivery, byRating, searchQuery, sort);

  return (
    <div className="filters">
      <span className="title"> Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            dispatchProduct({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            dispatchProduct({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            dispatchProduct({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            dispatchProduct({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}> Rating</label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            dispatchProduct({
              type: "FILTER_BY_RATING",
              payload: i,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => dispatchProduct({ type: "CLEAR_FILTERS" })}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
