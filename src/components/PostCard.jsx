import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PostCard({ post, currentUser, onLike, onDelete }) {

  const navigate = useNavigate();


  let user = null;

  try {
    user =
      typeof currentUser === "string"
        ? JSON.parse(currentUser)
        : currentUser;
  } catch {
    user = null;
  }

  
  const isAdmin = user?.role === "admin";
  const isOwner = post.author_id === user?.email;

  return (

    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >


      <h3
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/post/${post.id}`)}
      >
        {post.title}
      </h3>


      {isAdmin && (
        <span
          style={{
            background: "red",
            color: "#fff",
            padding: "3px 8px",
            borderRadius: "5px",
            fontSize: "10px"
          }}
        >
          ADMIN
        </span>
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
          whileHover={{ scale: 1.05 }}
        />
      )}


      <p style={{ marginTop: "10px" }}>
        {post.content?.substring(0, 100)}...
      </p>


      <p>
        <strong>Category:</strong> {post.category}
      </p>


      <div style={{ marginBottom: "10px" }}>
        {post.tags?.map((tag, index) => (
          <span
            key={index}
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
        {post.created_at
          ? new Date(post.created_at).toLocaleString()
          : ""}
      </small>

      <br /><br />


      <div>


        <motion.button
          className="btn"
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(post)}
        >
          👍 {post.likes || 0}
        </motion.button>


        <motion.button
          className="btn"
          style={{ marginLeft: "10px" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          View
        </motion.button>


        {isOwner && (
          <motion.button
            className="btn"
            style={{ marginLeft: "10px" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            Edit
          </motion.button>
        )}


        {(isOwner || isAdmin) && (
          <motion.button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(post.id)}
          >
            Delete
          </motion.button>
        )}

      </div>

    </motion.div>
  );
}

export default PostCard;