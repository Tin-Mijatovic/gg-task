import { fetchPosts } from "@/lib/api";
import { PostType } from "@/lib/types";
import Home from "@/components/Home";
import { PostsProvider } from "@/context/PostsContext";

export default async function Page() {
  const initialPosts: PostType[] = await fetchPosts();

  return (
    <PostsProvider initialPosts={initialPosts}>
      <Home />
    </PostsProvider>
  );
}
