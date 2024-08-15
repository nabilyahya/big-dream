import SearchInput from "./SearchInput";
import TotalMouny from "./TotalMouny";
const SearchHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <SearchInput />
      <TotalMouny />
    </div>
  );
};
export default SearchHeader;
