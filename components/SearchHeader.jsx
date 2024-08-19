import React, { useContext } from "react";
import SearchInput from "./SearchInput";
import TotalMouny from "./TotalMoney";
import { CartContext } from "../src/contexts/CartContext";
const SearchHeader = ({ searchQuery, onSearchChange }) => {
  const { showNewButton } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center mt-3 p-4 bg-gray-100 w-full fixed top-16 left-0 z-10">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
      />
      {showNewButton && (
        <button className=" ml-3 bg-black text-white  rounded-md p-1 text-[0.7rem]">
          Your Orders
        </button>
      )}
      <TotalMouny />
    </div>
  );
};

export default SearchHeader;
