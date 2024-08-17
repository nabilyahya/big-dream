import React, { useState } from "react";
import ItemsSlider from "../components/ItemsSlider";
import CategoriesSlider from "../components/CategoriesSlider";
import Space from "../components/Space";
import { sliderItems } from "../data/items";
import ConfirmButton from "../components/ConformOrderButton";
import SearchHeader from "../components/SearchHeader";
import RestaurantHeader from "../components/RestaurantHeader";
const Resturant = () => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="relative min-h-screen flex flex-col">
      <RestaurantHeader />
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        className="fixed top-0 left-0 right-0 "
      />
      <div className="flex-1 pt-36 pb-16 overflow-y-auto">
        <CategoriesSlider />
        <Space />
        <ItemsSlider
          sliderItems={sliderItems}
          searchQuery={searchQuery}
        />
      </div>
      <ConfirmButton
        sliderItems={sliderItems}
        className="fixed bottom-0 left-0 right-0 z-10"
      />
    </div>
  );
};

export default Resturant;
