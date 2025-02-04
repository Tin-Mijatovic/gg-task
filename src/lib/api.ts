import { PostType, PostsResponseType } from "@/lib/types";
import { SORT_ORDER_ASC, SORT_ORDER_DESC } from "@/utils/constants";
import { axiosInstance as axios } from "@/lib/axiosInstance";

export async function fetchPosts(): Promise<PostType[]> {
  try {
    const response = await axios.get<PostsResponseType>("/");
    const data = response.data;
    if (!data.posts) {
      throw new Error("No posts found in the response");
    }
    return data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function searchPosts(query: string): Promise<PostType[]> {
  try {
    const response = await axios.get<PostsResponseType>(`/search?q=${query}`);
    const data = response.data;
    if (!data.posts) {
      throw new Error("No posts found in the response");
    }
    return data.posts;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
}

export async function sortPosts(
  sortBy: string,
  order: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC
): Promise<PostType[]> {
  try {
    const response = await axios.get<PostsResponseType>(
      `/?sortBy=${sortBy}&order=${order}`
    );
    const data = response.data;
    if (!data.posts) {
      throw new Error("No posts found in the response");
    }
    return data.posts;
  } catch (error) {
    console.error("Error sorting posts:", error);
    throw error;
  }
}
