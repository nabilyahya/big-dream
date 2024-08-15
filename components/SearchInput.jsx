import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  return (
    <div className="relative flex flex-1 items-center">
      <input
        type="text"
        className="flex-1 p-2 pl-10 border rounded-md focus:outline-none"
        placeholder="Search..."
      />
      <FaSearch className="absolute left-2 top-2/4 transform -translate-y-1/2 text-red-500" />
    </div>
  );
};

export default SearchInput;
