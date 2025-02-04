import React from "react";
import { TAGS, TagKey } from "@/utils/constants";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (search: string) => void;
  handleSort: () => void;
  sortOrder: string;
  toggleFilterDropdown: () => void;
  isFilterDropdownVisible: boolean;
  handleFilter: (tag: TagKey) => void;
  selectedTags: TagKey[];
  handleRemoveTag: (tag: TagKey) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  handleSearch,
  handleSort,
  sortOrder,
  toggleFilterDropdown,
  isFilterDropdownVisible,
  handleFilter,
  selectedTags,
  handleRemoveTag,
}) => {
  return (
    <div>
      <div className="flex gap-2 mb-4 relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => handleSearch(search)}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Search
        </button>
        <div className="relative">
          <button
            onClick={toggleFilterDropdown}
            className="bg-blue-500 text-white p-2 rounded h-full"
          >
            Filter
          </button>
          {isFilterDropdownVisible && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg p-4 z-10 w-48">
              <ul className="list-none p-0 m-0 text-sm">
                {Object.entries(TAGS).map(([key, value]) => (
                  <li
                    key={key}
                    className="cursor-pointer p-2 hover:bg-gray-200 text-gray-800"
                    onClick={() => handleFilter(key as TagKey)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handleSort}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Sort ({sortOrder})
        </button>
      </div>
      <div className="mb-4">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-500 text-white p-2 rounded-full mr-2 cursor-pointer"
            onClick={() => handleRemoveTag(tag)}
          >
            {TAGS[tag]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
