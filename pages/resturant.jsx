import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ItemsSlider from "../components/ItemsSlider"
import CategoriesSlider from "../components/CategoriesSlider"
import Space from "../components/Space"
import {sliderItems} from "../data/items"
import ConfirmButton from "../components/ConformOrderButton"
const Resturant = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <div className="relative flex flex-1 items-center">
          <input
            type="text"
            className="flex-1 p-2 pl-10 border rounded-md focus:outline-none"
            placeholder="Search..."
          />
          <FaSearch className="absolute left-2 top-2/4 transform -translate-y-1/2 text-red-500" />
        </div>
        <div className="bg-red-500 text-white p-2 ml-4 rounded-md font-bold text-center text-[0.7rem]">
          <span>Total Money</span>
          <span className="block text-[0.7rem]">12345 <span>$</span></span> 
        </div>
      </div>

      {/* Slider with Categories */}
  <CategoriesSlider/>
  <Space/>
  <ItemsSlider sliderItems ={sliderItems}/>
  <ConfirmButton/>
    </div>
  );
}

export default Resturant;
