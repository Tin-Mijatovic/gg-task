"use client";

import React, { useState } from "react";
import { usePosts } from "@/context/PostsContext";
import PostList from "@/components/PostList";
import SearchBar from "@/components/SearchBar";
import { TAGS, TagKey } from "@/utils/constants";

export default function Home() {
  const { posts, sortOrder, handleSearch, handleSort } = usePosts();
  const [selectedTags, setSelectedTags] = useState<TagKey[]>([]);
  const [isFilterDropdownVisible, setIsFilterDropdownVisible] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const handleFilter = (tag: TagKey) => {
    setSelectedTags([...selectedTags, tag]);
    handleSearch(search);
    setIsFilterDropdownVisible(false);
  };

  const handleRemoveTag = (tag: TagKey) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    handleSearch(search);
  };

  const getFilteredData = () => {
    if (selectedTags.length === 0) {
      return posts;
    }
    return posts.filter((post) =>
      selectedTags.every((tag) => post.tags.includes(tag))
    );
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownVisible(!isFilterDropdownVisible);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleSort={handleSort}
        sortOrder={sortOrder}
        toggleFilterDropdown={toggleFilterDropdown}
        isFilterDropdownVisible={isFilterDropdownVisible}
        handleFilter={handleFilter}
        selectedTags={selectedTags}
        handleRemoveTag={handleRemoveTag}
      />
      <PostList posts={getFilteredData()} />
      <a href="/favorites" className="mt-4 block text-blue-500">
        View Favorites
      </a>
    </div>
  );
}
