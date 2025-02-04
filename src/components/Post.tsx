import React from "react";
import { PostType } from "@/lib/types";

interface PostPropsType {
  post: PostType;
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
}

const Post: React.FC<PostPropsType> = ({ post, favorites, toggleFavorite }) => {
  return (
    <li
      key={post.id}
      className="border-b border-gray-700 p-4 mb-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2 text-white">{post.title}</h2>
        <p className="text-gray-300 mb-4 text-sm line-clamp-1">{post.body}</p>
        <button
          onClick={() => toggleFavorite(post.id)}
          className="flex items-center justify-center px-4 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
        >
          <span
            className={`mr-2 ${
              favorites.has(post.id) ? "text-red-500" : "text-gray-400"
            }`}
          >
            {favorites.has(post.id) ? "❤️" : "🤍"}
          </span>
          {favorites.has(post.id) ? "Favorite" : "Favorite"}
        </button>
      </div>
    </li>
  );
};

export default Post;
