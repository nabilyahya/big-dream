import React, { useContext, useEffect } from "react";
import { incrementQuantity, decrementQuantity } from "../helper/counterHelpers";
import { CartContext } from "../src/contexts/CartContext";

const ItemsSlider = ({ sliderItems }) => {
  const { quantities, dispatch } = useContext(CartContext);

  useEffect(() => {
    if (sliderItems && sliderItems.length > 0) {
      dispatch({
        type: "INITIALIZE_QUANTITIES",
        payload: sliderItems.map((slider) => slider.items.map(() => 0)),
      });
    }
  }, [sliderItems, dispatch]);

  return (
    <div>
      {sliderItems.map((slider, sliderIndex) => (
        <div
          key={sliderIndex}
          className="mb-4"
        >
          <h3 className="pl-3 pb-2 text-lg">{slider.title}</h3>
          <div className="overflow-x-auto mt-4 scrollbar-hide">
            <div className="flex space-x-4 px-4">
              {slider.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="min-w-[150px] bg-white border border-gray-300 rounded-lg flex flex-col items-center justify-center shadow-md p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded-t-lg"
                  />
                  <div className="text-center mt-2">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price}</p>
                    <div className="mt-2 flex items-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() =>
                          decrementQuantity(dispatch, sliderIndex, itemIndex)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">
                        {quantities[sliderIndex]?.[itemIndex] || 0}
                      </span>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() =>
                          incrementQuantity(dispatch, sliderIndex, itemIndex)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsSlider;
