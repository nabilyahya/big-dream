// src/reducers/cartReducer.js
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_QUANTITIES":
      return action.payload;
    case "INCREMENT":
      return state.map((slider, sliderIndex) =>
        sliderIndex === action.sliderIndex
          ? slider.map((quantity, itemIndex) =>
              itemIndex === action.itemIndex ? quantity + 1 : quantity
            )
          : slider
      );
    case "DECREMENT":
      return state.map((slider, sliderIndex) =>
        sliderIndex === action.sliderIndex
          ? slider.map((quantity, itemIndex) =>
              itemIndex === action.itemIndex && quantity > 0
                ? quantity - 1
                : quantity
            )
          : slider
      );
    default:
      return state;
  }
};
