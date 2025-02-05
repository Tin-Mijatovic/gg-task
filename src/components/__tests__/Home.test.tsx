import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/components/Home";
import { PostType } from "@/lib/types";
import { usePosts } from "@/context/PostsContext";

jest.mock("@/context/PostsContext");

const mockPosts: PostType[] = [
  {
    id: 1,
    title: "Post 1",
    body: "Body 1",
    tags: ["tag1"],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    userId: 1,
  },
  {
    id: 2,
    title: "Post 2",
    body: "Body 2",
    tags: ["tag2"],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    userId: 2,
  },
  {
    id: 3,
    title: "Post 3",
    body: "Body 3",
    tags: ["tag3"],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    userId: 3,
  },
];

const mockFavoritePosts = new Set([1, 3]);
const mockHandleSearch = jest.fn();
const mockHandleSort = jest.fn();
const mockToggleFavorite = jest.fn();

(usePosts as jest.Mock).mockReturnValue({
  posts: mockPosts,
  favoritePosts: mockFavoritePosts,
  handleSearch: mockHandleSearch,
  handleSort: mockHandleSort,
  toggleFavorite: mockToggleFavorite,
  sortOrder: "asc",
});

describe("Home", () => {
  it("renders posts and interacts with usePosts hook", () => {
    render(<Home />);

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();

    expect(screen.getByText("View Favorites")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(searchInput, { target: { value: "Post 1" } });
    fireEvent.click(screen.getByText("Search"));
    expect(mockHandleSearch).toHaveBeenCalledWith("Post 1");

    fireEvent.click(screen.getByText("Sort (asc)"));
    expect(mockHandleSort).toHaveBeenCalled();
  });
});
