import React from "react";

const RestaurantHeader = () => {
  const logo =
    "https://i.pinimg.com/originals/45/d3/4d/45d34df4612f4c50e88695e649e7a997.png";
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md fixed top-0 left-0 right-0 z-20">
      {/* Restaurant Name */}
      <h1 className="text-xl font-bold text-gray-800">Restaurant Name</h1>
      {/* Logo */}
      <img
        src={logo}
        alt="Restaurant Logo"
        className="h-12" // Adjust size as needed
      />
    </div>
  );
};

export default RestaurantHeader;
