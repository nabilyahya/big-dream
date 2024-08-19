// src/contexts/CartContext.js

import React, { createContext, useReducer } from "react";

// Initial state for the cart
const initialState = {
  quantities: [], // Stores quantities for each slider and item
  showExtraButton: false, // Controls visibility of the extra button
  totalPrice: 0, // Initialize total price
  showNewButton: false,
};

// Reducer function to manage state changes
// Reducer function to manage state changes
const CartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_QUANTITIES":
      return {
        ...state,
        quantities: action.payload,
        showExtraButton: action.payload.some((sliderQuantities) =>
          sliderQuantities.some((quantity) => quantity > 0)
        ),
        totalPrice: 0, // Reset total price when initializing
      };

    case "INCREMENT": {
      const updatedQuantitiesInc = state.quantities.map(
        (sliderQuantities, sIndex) =>
          sliderQuantities.map((quantity, iIndex) =>
            sIndex === action.sliderIndex && iIndex === action.itemIndex
              ? quantity + 1
              : quantity
          )
      );

      const updatedTotalPrice = state.totalPrice + (action.itemPrice || 0); // Add the price of the incremented item

      return {
        ...state,
        quantities: updatedQuantitiesInc,
        showExtraButton: updatedQuantitiesInc.some((sliderQuantities) =>
          sliderQuantities.some((quantity) => quantity > 0)
        ),
        totalPrice: parseFloat(updatedTotalPrice.toFixed(2)), // Ensure total price is a valid number
      };
    }

    case "DECREMENT": {
      const currentQuantity =
        state.quantities[action.sliderIndex][action.itemIndex];

      const updatedQuantitiesDec = state.quantities.map(
        (sliderQuantities, sIndex) =>
          sliderQuantities.map((quantity, iIndex) =>
            sIndex === action.sliderIndex &&
            iIndex === action.itemIndex &&
            quantity > 0
              ? quantity - 1
              : quantity
          )
      );

      const updatedTotalPrice =
        currentQuantity > 0
          ? state.totalPrice - (action.itemPrice || 0)
          : state.totalPrice;

      return {
        ...state,
        quantities: updatedQuantitiesDec,
        showExtraButton: updatedQuantitiesDec.some((sliderQuantities) =>
          sliderQuantities.some((quantity) => quantity > 0)
        ),
        totalPrice: parseFloat(Math.max(updatedTotalPrice, 0).toFixed(2)), // Ensure total price is a valid number and non-negative
      };
    }
    case "SHOW_NEW_BUTTON":
      return {
        ...state,
        showNewButton: true,
      };

    case "HIDE_NEW_BUTTON":
      return {
        ...state,
        showNewButton: false,
      };
    case "RESET_COUNTER":
      return {
        ...state,
        totalPrice: 0,
      };

    default:
      return state;
  }
};

// Create context
export const CartContext = createContext();

// Provider component to wrap around parts of the app that need access to the context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const resetCounter = () => dispatch({ type: "RESET_COUNTER" });
  return (
    <CartContext.Provider value={{ ...state, dispatch, resetCounter }}>
      {children}
    </CartContext.Provider>
  );
};
