// NOTE:
// This is a hack since API does not support favorite posts not it has endpoint where i can fetch
// array of posts by id. So i am storing favorite posts in localstorage and using it to filter posts
"use client";

import React from "react";
import { usePosts } from "@/context/PostsContext";
import PostList from "@/components/PostList";

const Favorites: React.FC = () => {
  const { posts, favoritePosts } = usePosts();
  const favoritePostsList = posts.filter((post) => favoritePosts.has(post.id));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Posts</h1>
      <PostList posts={favoritePostsList} />
    </div>
  );
};

export default Favorites;
