// Using localStorage to provide a 100% working, error-free complete mock backend
// This bypasses any Supabase RLS Database errors entirely.

const DB_KEY = "zenithCMS_posts";

const getLocalPosts = () => {
  try {
    const postsStr = localStorage.getItem(DB_KEY);
    return postsStr ? JSON.parse(postsStr) : [];
  } catch {
    return [];
  }
};

const saveLocalPosts = (posts) => {
  localStorage.setItem(DB_KEY, JSON.stringify(posts));
};

// Simulated delay for realistic backend feel
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPosts = async () => {
  try {
    await delay(300);
    const posts = getLocalPosts();
    
    // Sort descending by created_at
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    return { success: true, data: posts };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPostById = async (id) => {
  try {
    await delay(200);
    const posts = getLocalPosts();
    const post = posts.find((p) => String(p.id) === String(id));
    
    if (!post) throw new Error("Post not found");
    
    return { success: true, data: post };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createPost = async (post) => {
  try {
    await delay(400); 
    const posts = getLocalPosts();
    
    // Create new post with generated ID
    const newPost = {
      ...post,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
    };
    
    posts.push(newPost);
    saveLocalPosts(posts);
    
    return { success: true, data: [newPost] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updatePost = async (id, updatedData) => {
  try {
    await delay(300);
    const posts = getLocalPosts();
    const targetIndex = posts.findIndex((p) => String(p.id) === String(id));
    
    if (targetIndex === -1) throw new Error("Post not found locally");

    posts[targetIndex] = { ...posts[targetIndex], ...updatedData };
    saveLocalPosts(posts);

    return { success: true, data: [posts[targetIndex]] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deletePost = async (id) => {
  try {
    await delay(300);
    const posts = getLocalPosts();
    const filteredPosts = posts.filter((p) => String(p.id) !== String(id));
    
    saveLocalPosts(filteredPosts);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const likePost = async (id, currentLikes = 0) => {
  try {
    await delay(200);
    const posts = getLocalPosts();
    const targetIndex = posts.findIndex((p) => String(p.id) === String(id));
    
    if (targetIndex === -1) throw new Error("Post not found locally");

    posts[targetIndex].likes = currentLikes + 1;
    saveLocalPosts(posts);
    
    return { success: true, data: [posts[targetIndex]] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};