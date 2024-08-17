import React, { useContext, useState } from "react";
import { CartContext } from "../src/contexts/CartContext";

const ConfirmButton = ({ sliderItems }) => {
  const { quantities, showExtraButton } = useContext(CartContext);
  const [isAddNotePopupOpen, setIsAddNotePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const handleAddNoteClick = () => {
    setIsAddNotePopupOpen(true);
  };

  const handleCloseAddNotePopup = () => {
    setIsAddNotePopupOpen(false);
  };

  const handleConfirmClick = () => {
    setIsConfirmPopupOpen(true);
  };

  const handleCloseConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
  };

  const handleAgree = () => {
    setIsConfirmPopupOpen(false);
    // Handle the confirmation action
  };

  // Extract selected items and their names
  const selectedItems = quantities
    .map((sliderQuantities, sliderIndex) =>
      sliderQuantities
        .map((quantity, itemIndex) => ({
          quantity,
          itemName: sliderItems[sliderIndex].items[itemIndex].name, // Get the name of the item
        }))
        .filter((item) => item.quantity > 0)
    )
    .flat();

  return (
    <div className="relative">
      {showExtraButton && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2 flex flex-col items-center space-y-2 z-10">
          <button
            className="bg-white text-red-500 py-2 px-8 rounded-lg border border-red-500"
            onClick={handleAddNoteClick}
          >
            Add note
          </button>
          <button
            className="bg-red-500 text-white py-2 px-8 rounded-lg"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      )}
      {/* "Add Note" Popup Modal */}
      {isAddNotePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[80%] mx-auto">
            <h2 className="text-lg font-bold mb-4">Add a Note</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows="4"
              placeholder="Type your note here..."
            />
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={handleCloseAddNotePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Popup Modal */}
      {isConfirmPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[80%] mx-auto">
            <h2 className="text-lg font-bold mb-4">Confirm Your Order</h2>
            <p className="mb-4">You have selected the following items:</p>
            <ul className="mb-4">
              {selectedItems.map((item, index) => (
                <li
                  key={index}
                  className="text-sm"
                >
                  {item.itemName}: {item.quantity}
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={handleAgree}
              >
                Yes, Confirm
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={handleCloseConfirmPopup}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmButton;
