import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPosts, deletePost, likePost } from "../services/postService";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

function Home() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);

  let currentUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    currentUser = null;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    const response = await getPosts();

    if (response.success) {
      setPosts(response.data || []);
    }

    setLoading(false);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    await deletePost(id);
    fetchPosts();
  };


  const handleLike = async (post) => {
    await likePost(post.id, post.likes || 0);
    fetchPosts();
  };

  
  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <Layout loading={loading}>

      {!loading && (
        <div className="home">


          <motion.div
            className="home-hero"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Welcome to ZenithCMS</h1>
            <p>Explore ideas. Share knowledge. Build content.</p>
          </motion.div>


          <SearchBar search={search} setSearch={setSearch} />


          <div className="home-stats">

            <div className="card">
              <h4>Total Posts</h4>
              <p>{posts.length}</p>
            </div>

            <div className="card">
              <h4>My Posts</h4>
              <p>
                {posts.filter(p => p.author_id === currentUser?.email).length}
              </p>
            </div>

          </div>


          {filteredPosts.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No posts found</h3>
              <p>Try a different keyword</p>
            </motion.div>
          )}


          <motion.div
            className="posts-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <PostCard
                  post={post}
                  currentUser={currentUser} 
                  onLike={handleLike}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </motion.div>


          {visiblePosts < filteredPosts.length && (
            <div className="load-more">
              <motion.button
                className="btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setVisiblePosts(prev => prev + 6)}
              >
                Load More
              </motion.button>
            </div>
          )}

        </div>
      )}

    </Layout>
  );
}

export default Home;