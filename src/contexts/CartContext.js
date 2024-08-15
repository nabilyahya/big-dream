// src/contexts/CartContext.js

import React, { createContext, useReducer } from "react";

// Initial state for the cart
const initialState = {
  quantities: [], // Stores quantities for each slider and item
  showExtraButton: false, // Controls visibility of the extra button
};

// Reducer function to manage state changes
const CartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_QUANTITIES":
      // Initialize quantities with the given payload
      return {
        ...state,
        quantities: action.payload,
        showExtraButton: action.payload.some((sliderQuantities) =>
          sliderQuantities.some((quantity) => quantity > 0)
        ),
      };
    case "INCREMENT": {
      // Increment the quantity of a specific item
      const updatedQuantitiesInc = state.quantities.map(
        (sliderQuantities, sIndex) =>
          sliderQuantities.map((quantity, iIndex) =>
            sIndex === action.sliderIndex && iIndex === action.itemIndex
              ? quantity + 1
              : quantity
          )
      );
      return {
        ...state,
        quantities: updatedQuantitiesInc,
        showExtraButton: updatedQuantitiesInc.some((sliderQuantities) =>
          sliderQuantities.some((quantity) => quantity > 0)
        ),
      };
    }
    case "DECREMENT": {
      // Decrement the quantity of a specific item
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
      return {
        ...state,
        quantities: updatedQuantitiesDec,
        showExtraButton: updatedQuantitiesDec.some((sliderQuantities) =>
          sliderQuantities.some((quantity) => quantity > 0)
        ),
      };
    }
    default:
      return state;
  }
};

// Create context
export const CartContext = createContext();

// Provider component to wrap around parts of the app that need access to the context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
