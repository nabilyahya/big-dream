const CategoriesSlider = () => {
  return (
    <div className="overflow-x-auto mt-4 scrollbar-hide">
      <div className="flex space-x-4 px-4">
        {["Category 1", "Category 2", "Category 3", "Category 4"].map(
          (category, index) => (
            <div
              key={index}
              className="min-w-[100px] h-[1.8rem] border-radiues text-[white] bg-[#EF4444] border border-gray-300 rounded-lg flex items-center justify-center shadow-md"
            >
              {category}
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default CategoriesSlider;
