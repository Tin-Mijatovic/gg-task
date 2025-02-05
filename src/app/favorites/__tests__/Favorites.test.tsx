import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Favorites from "@/app/favorites/page";
import { PostType } from "@/lib/types";

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

jest.mock("@/context/PostsContext", () => ({
  usePosts: () => ({
    posts: mockPosts,
    favoritePosts: mockFavoritePosts,
  }),
}));

describe("Favorites", () => {
  it("renders favorite posts", () => {
    render(<Favorites />);

    expect(screen.getByText("Favorite Posts")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
  });
});
