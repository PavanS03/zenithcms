import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import { getPosts } from "../services/postService";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin"; 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    const { data, error } = await getPosts();

    if (!error) {
      setPosts(data || []);
    }

    setLoading(false);
  };


  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };


  const totalPosts = posts.length;

  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likes || 0),
    0
  );

  const userPosts = posts.filter(
    (post) => post.author_id === user?.email
  );

  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <Layout loading={loading}>

      {!loading && (
        <div className="dashboard">


          <motion.div
            className="dashboard-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>
              {getGreeting()}, {user?.username || "User"}
              {isAdmin && (
                <span style={{
                  marginLeft: "8px",
                  color: "gold"
                }}>
                   Admin
                </span>
              )}
            </h2>
          </motion.div>


          <div className="dashboard-grid">

            <motion.div
              className="card stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>Total Posts</h3>
              <h1>{totalPosts}</h1>
            </motion.div>

            <motion.div
              className="card stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>Total Likes</h3>
              <h1>{totalLikes}</h1>
            </motion.div>

            <motion.div
              className="card stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>My Posts</h3>
              <h1>{userPosts.length}</h1>
            </motion.div>


            {isAdmin && (
              <motion.div
                className="card stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3>Admin Control</h3>
                <p style={{ fontSize: "14px" }}>
                  You can manage all posts across the platform.
                </p>
              </motion.div>
            )}

          </div>


          <motion.div
            className="card latest-post"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Latest Post</h3>

            {latestPost ? (
              <>
                <h4>{latestPost.title}</h4>

                {latestPost.image_url && (
                  <img
                    src={latestPost.image_url}
                    alt=""
                    className="post-image"
                  />
                )}

                <p>
                  {latestPost.content?.substring(0, 120)}...
                </p>

                <small>
                  {latestPost.created_at
                    ? new Date(latestPost.created_at).toLocaleString()
                    : ""}
                </small>
              </>
            ) : (
              <p>No posts available</p>
            )}

          </motion.div>

        </div>
      )}

    </Layout>
  );
}

export default Dashboard;