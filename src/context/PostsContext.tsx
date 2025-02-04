"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { PostType } from "@/lib/types";
import { fetchPosts, searchPosts, sortPosts } from "@/lib/api";
import { setFavorites, getFavorites } from "@/utils/storage";
import { SORT_ORDER_ASC, SORT_ORDER_DESC } from "@/utils/constants";

interface PostsContextProps {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  sortOrder: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;
  handleSearch: (searchQuery: string) => void;
  handleSort: () => void;
  favoritePosts: Set<number>;
  toggleFavorite: (postId: number) => void;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const PostsProvider = ({
  children,
  initialPosts,
}: {
  children: ReactNode;
  initialPosts: PostType[];
}) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [sortOrder, setSortOrder] = useState<
    typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC
  >(SORT_ORDER_ASC);
  const [sortBy, setSortBy] = useState<string>("title");
  const [favoritePosts, setFavoritePosts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavoritePosts(new Set(savedFavorites));
  }, []);

  useEffect(() => {
    setFavorites(Array.from(favoritePosts));
  }, [favoritePosts]);

  const fetchAndSetPosts = async (
    query: string = "",
    sortBy: string = "title",
    sortOrder: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC = SORT_ORDER_ASC
  ) => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      const searchResult = await searchPosts(searchQuery);
      setPosts(searchResult);
    } catch (err) {
      console.error("Failed to search posts:", err);
    }
  };

  const handleSort = async () => {
    const newSortOrder =
      sortOrder === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC;
    setSortOrder(newSortOrder);
    const sortedPosts = await sortPosts(sortBy, newSortOrder);
    setPosts(sortedPosts);
  };

  const toggleFavorite = (postId: number) => {
    setFavoritePosts((prevFavorites: Set<number>) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(postId)) {
        newFavorites.delete(postId);
      } else {
        newFavorites.add(postId);
      }
      return newFavorites;
    });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        sortOrder,
        handleSearch,
        handleSort,
        favoritePosts,
        toggleFavorite,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextProps => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
