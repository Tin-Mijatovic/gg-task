import React from "react";
import { PostType } from "@/lib/types";
import { usePosts } from "@/context/PostsContext";
import Post from "./Post";

interface PostListPropsType {
  posts: PostType[];
}

const PostList: React.FC<PostListPropsType> = ({ posts }) => {
  const { favoritePosts, toggleFavorite } = usePosts();

  return (
    <ul>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          favorites={favoritePosts}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </ul>
  );
};

export default PostList;
