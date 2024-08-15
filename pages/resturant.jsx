import React from "react";
import { FaSearch } from "react-icons/fa";
import ItemsSlider from "../components/ItemsSlider";
import CategoriesSlider from "../components/CategoriesSlider";
import Space from "../components/Space";
import { sliderItems } from "../data/items";
import ConfirmButton from "../components/ConformOrderButton";
import SearchHeader from "../components/SearchHeader";
const Resturant = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      <SearchHeader />
      <CategoriesSlider />
      <Space />
      <ItemsSlider sliderItems={sliderItems} />
      <ConfirmButton />
    </div>
  );
};

export default Resturant;
