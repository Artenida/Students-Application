import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
interface SearchbarProps {
  onChange: (searchValue: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex justify-center w-full items-center bg-white shadow-sm pb-5 md:space-x-32 sm:ml-0 pt-28">
      <form action="" className="relative ml-16">
        <input
          type="text"
          placeholder="Search"
          className={`md:w-[800px] w-full sm:w-80 py-2 px-2 rounded-md bg-transparent border ${
            isFocused
              ? "border-custom-color3"
              : "border-custom-color3"
          } focus:outline-none`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <button className="text-custom-color3 absolute right-1 top-1/2 -translate-y-1/2 bg-sate-900 rounded-full px-2">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
