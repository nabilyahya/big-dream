export const incrementQuantity = (
  dispatch,
  sliderIndex,
  itemIndex,
  itemPrice
) => {
  if (itemPrice) {
    // Ensure itemPrice is valid
    dispatch({
      type: "INCREMENT",
      sliderIndex,
      itemIndex,
      itemPrice,
    });
  }
};

export const decrementQuantity = (
  dispatch,
  sliderIndex,
  itemIndex,
  itemPrice
) => {
  if (itemPrice) {
    // Ensure itemPrice is valid
    dispatch({
      type: "DECREMENT",
      sliderIndex,
      itemIndex,
      itemPrice,
    });
  }
};
