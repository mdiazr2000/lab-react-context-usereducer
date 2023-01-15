import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";
import {
  Product,
  ProductFiltersType,
  ProductStateType,
} from "../models/product";

export interface CartContentInterface {
  state: ProductStateType;
  dispatch: React.Dispatch<any>;
  stateProduct: ProductFiltersType;
  dispatchProduct: React.Dispatch<any>;
}

export const Cart = createContext<CartContentInterface>({
  state: {
    products: [],
    cart: [],
  },
  dispatch: () => null,
  stateProduct: {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  },
  dispatchProduct: () => null,
});
faker.seed(99);

interface ContextElementProps {
  children: ReactNode;
}

export const Context: React.FC<ContextElementProps> = ({ children }) => {
  const products = [...Array<Product>(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.abstract(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [stateProduct, dispatchProduct] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, stateProduct, dispatchProduct }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => useContext(Cart);
