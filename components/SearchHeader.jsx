import React from "react";
import SearchInput from "./SearchInput";
import TotalMouny from "./TotalMouny";

const SearchHeader = () => {
  return (
    <div className="flex justify-between items-center mt-3  p-4 bg-gray-100 w-full fixed top-16 left-0 z-10">
      <SearchInput />
      <TotalMouny />
    </div>
  );
};

export default SearchHeader;
