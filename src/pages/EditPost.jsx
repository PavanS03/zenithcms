import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../services/postService";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

function EditPost() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);

    const { data, error } = await getPostById(id);

    if (!error && data) {

    
      if (data.author_id !== currentUser) {
        setMessage("You are not allowed to edit this post");

        setTimeout(() => {
          navigate("/home");
        }, 1500);

        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category || "Tech");
      setTags((data.tags || []).join(", "));
      setImage(data.image_url || "");
    }

    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("Title and content are required");
      return;
    }

    const updatedPost = {
      title,
      content,
      category,
      tags: tags.split(",").map(tag => tag.trim()),
      image_url: image,
    };

    const { error } = await updatePost(id, updatedPost);

    if (!error) {
      setMessage("Post updated successfully 🎉");

      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } else {
      setMessage("Error updating post ❌");
    }
  };

  return (

    <Layout loading={loading}>

      {loading && <Loader />}

      {!loading && (

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >

          <h2>Edit Post</h2>

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

          <form onSubmit={handleUpdate}>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              <option>Tech</option>
              <option>AI</option>
              <option>News</option>
            </select>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e)=>setTags(e.target.value)}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e)=>setImage(e.target.value)}
            />

            {image && (
              <motion.img
                src={image}
                alt=""
                style={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "10px"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            <motion.button
              className="btn"
              type="submit"
              whileTap={{ scale: 0.9 }}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Update Post
            </motion.button>

          </form>

        </motion.div>

      )}

    </Layout>
  );
}

export default EditPost;