import { useEffect, useState } from "react";
import {
  getPosts,
  deletePost,
  likePost
} from "../services/postService";

function usePosts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);

    const response = await getPosts();

    if (response.success) {
      setPosts(response.data);
      setError("");
    } else {
      setError("Failed to load posts");
    }

    setLoading(false);
  };

  const handleLike = async (post) => {
    await likePost(post.id, post.likes || 0);
    fetchPosts();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this post?");

    if (!confirmDelete) return;

    await deletePost(id);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    handleLike,
    handleDelete
  };
}

export default usePosts;