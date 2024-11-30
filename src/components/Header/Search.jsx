import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form
      className="relative max-w-xs sm:max-w-sm lg:max-w-lg"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearch}
        className="w-full pl-8 pr-10 py-1.5 sm:py-2 border-2 border-pink-500 rounded focus:outline-none focus:border-pink-600 text-xs sm:text-sm lg:text-base"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-pink-500 hover:bg-pink-600 rounded-r"
      >
        <SearchIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
      </button>
    </form>
  );
};

export default Search;
