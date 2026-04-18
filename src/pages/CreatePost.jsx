import React, { useState } from "react";
import Layout from "../components/Layout";
import { createPost } from "../services/postService";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const categories = [
    "Tech",
    "AI",
    "News",
    "Stock Market",
    "Startups",
    "Cybersecurity"
  ];

  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Only image files allowed ❌");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Max size 2MB ❌");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageURL("");
    setMessage("");
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageURL("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("Title & content required");
      return;
    }

    setLoading(true);

    let finalImage = imageURL;
    if (imageFile) finalImage = imagePreview;

    const newPost = {
      title,
      content,
      category,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      image_url: finalImage,
      author_id: currentUser?.email,
      likes: 0,
      created_at: new Date().toISOString()
    };

    const response = await createPost(newPost);

    setLoading(false);

    if (!response.error) {
      setMessage("Post created 🎉");

      setTitle("");
      setContent("");
      setTags("");
      setImageFile(null);
      setImagePreview("");
      setImageURL("");

      setTimeout(() => navigate("/home"), 1200);
    } else {
      setMessage(`Error ❌: ${response.error || 'Unknown error'}`);
    }
  };

  return (

    <Layout loading={loading}>

      <motion.div
        className="card create-post"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h2>Create New Post</h2>

        {message && <p className="form-message">{message}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            rows={5}
          />

          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e)=>setTags(e.target.value)}
          />

          <div className="upload-box">

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <p>or paste image URL</p>

            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e)=>{
                setImageURL(e.target.value);
                setImagePreview(e.target.value);
                setImageFile(null);
              }}
            />

          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="preview" />

              <button
                type="button"
                className="btn btn-danger"
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          )}

          <button className="btn submit-btn" type="submit">
            Publish Post
          </button>

        </form>

      </motion.div>

    </Layout>
  );
}

export default CreatePost;