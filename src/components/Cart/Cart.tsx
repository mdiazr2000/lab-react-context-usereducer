import { ListGroup, Button, ListGroupItem, Form, Image } from "react-bootstrap";
import { CartState } from "../../Context/Context";
import React, { useEffect, useState } from "react";
import { Product } from "../../models/product";
import Rating from "../Rating/Rating";

import "./cart.scss";
import "../Home/home.scss";
import "../Header/header.scss";
import { AiFillDelete } from "react-icons/ai";

const Cart: React.FC = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc: number, curr: Product) => acc + Number(curr.price * curr.qty),
        0
      )
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer summary-product-container">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroupItem key={prod.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "30%", padding: "20px" }}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </div>
                <div className="cartItemDetail">{prod.name}</div>
                <div className="cartItemDetail">{prod.price}</div>
                <div>
                  <Rating rating={prod.ratings} />
                </div>
                <div className="cartItemDetail">
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {Array.from(Array(prod.inStock).keys()).map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </div>
                <div>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  ></AiFillDelete>
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total : $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
