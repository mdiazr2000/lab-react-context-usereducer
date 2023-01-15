import {
  Product,
  ProductFiltersType,
  ProductStateType,
} from "../models/product";
import { Reducer } from "react";

type Actions =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: Product }
  | {
      type: "CHANGE_CART_QTY";
      payload: {
        id: string;
        qty: number;
      };
    };

export const cartReducer: Reducer<any, any> = (
  state: ProductStateType,
  action: Actions
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map((c) => {
          c.qty = c.id === action.payload.id ? action.payload.qty : c.qty;
          return c;
        }),
      };

    default:
      return state;
  }
};

type ActionsProduct =
  | { type: "SORT_BY_PRICE"; payload: string }
  | { type: "FILTER_BY_STOCK" }
  | { type: "FILTER_BY_DELIVERY" }
  | { type: "FILTER_BY_RATING"; payload: number }
  | { type: "FILTER_BY_SEARCH"; payload: string }
  | { type: "CLEAR_FILTERS" };

export const productReducer: Reducer<any, any> = (
  state: ProductFiltersType,
  action: ActionsProduct
) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
  }
};
