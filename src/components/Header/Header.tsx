import "./header.scss";
import React from "react";

import { Dropdown, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../../Context/Context";
import { Product } from "../../models/product";

const Header: React.FC = () => {
  const {
    state: { cart },
    dispatch,
    dispatchProduct,
  } = CartState();
  return (
    <div className="navBar">
      <div className="container_global">
        <div className="shoppingLabel">
          <Link to="/">Shopping Cart</Link>
        </div>
        <div className="globalSearch">
          <form className="form_container">
            <input
              className="input"
              placeholder="Search a product"
              onChange={(e) =>
                dispatchProduct({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            />
          </form>
        </div>
        <div className="shoppingCart">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaShoppingCart color="white" size="25px"></FaShoppingCart>
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length ? (
                cart.map((prod: Product) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>{prod.price}</span>
                    </div>
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
                  </span>
                ))
              ) : (
                <Dropdown.Item style={{ padding: 10 }}>
                  Cart is empty
                </Dropdown.Item>
              )}
              {cart.length ? (
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go to Cart
                  </Button>
                </Link>
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
