// src/helpers/cartHelpers.js

export const incrementQuantity = (dispatch, sliderIndex, itemIndex) => {
  dispatch({ type: "INCREMENT", sliderIndex, itemIndex });
};

export const decrementQuantity = (dispatch, sliderIndex, itemIndex) => {
  dispatch({ type: "DECREMENT", sliderIndex, itemIndex });
};
