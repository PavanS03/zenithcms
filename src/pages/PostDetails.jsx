import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost, likePost } from "../services/postService";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

function PostDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);

    const { data, error } = await getPostById(id);

    if (!error) {
      setPost(data);
    }

    setLoading(false);
  };

  const handleLike = async () => {
    await likePost(post.id, post.likes || 0);
    fetchPost();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    await deletePost(post.id);

    setMessage("Post deleted");

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (

    <Layout loading={loading}>

      {loading && <Loader />}

      {!loading && post && (

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >

          <h2>{post.title}</h2>

          {message && (
            <motion.p
              style={{
                background: "var(--accent)",
                color: "black",
                padding: "8px",
                borderRadius: "5px",
                textAlign: "center"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {message}
            </motion.p>
          )}

          {post.image_url && (
            <motion.img
              src={post.image_url}
              alt=""
              style={{
                width: "100%",
                borderRadius: "10px",
                marginTop: "10px"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <p style={{ marginTop: "15px" }}>
            {post.content}
          </p>

          <p>
            <strong>Category:</strong> {post.category}
          </p>

          <div style={{ marginBottom: "10px" }}>
            <strong>Tags:</strong>{" "}
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "var(--accent)",
                  color: "black",
                  padding: "3px 8px",
                  marginRight: "5px",
                  borderRadius: "5px",
                  fontSize: "12px"
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <small>
            Created: {new Date(post.created_at).toLocaleString()}
          </small>

          <br /><br />

          <div>

            <motion.button
              className="btn"
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
            >
              👍 {post.likes || 0}
            </motion.button>

            {post.author_id === currentUser && (
              <>
                <motion.button
                  className="btn"
                  style={{ marginLeft: "10px" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(`/edit/${post.id}`)}
                >
                  Edit
                </motion.button>

                <motion.button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                >
                  Delete
                </motion.button>
              </>
            )}

          </div>

        </motion.div>

      )}

    </Layout>
  );
}

export default PostDetails;