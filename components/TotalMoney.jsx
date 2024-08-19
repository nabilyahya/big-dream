// src/components/TotalMoney.js

import React, { useContext } from "react";
import { CartContext } from "../src/contexts/CartContext";

const TotalMoney = () => {
  const { totalPrice } = useContext(CartContext);

  return (
    <div className="bg-red-500 text-white p-2 ml-4 rounded-md font-bold text-center text-[0.7rem]">
      <span>Total Money</span>
      <span className="block text-[0.7rem]">
        {totalPrice.toFixed(2)} <span>$</span>
      </span>
    </div>
  );
};

export default TotalMoney;
