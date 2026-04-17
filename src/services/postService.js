import { supabase } from "../lib/supabase";


export const getPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return { success: false, error: error.message };
  }
};



export const getPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return { success: false, error: error.message };
  }
};



export const createPost = async (post) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([post]);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error creating post:", error.message);
    return { success: false, error: error.message };
  }
};



export const updatePost = async (id, updatedData) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update(updatedData)
      .eq("id", id);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error updating post:", error.message);
    return { success: false, error: error.message };
  }
};


export const deletePost = async (id) => {
  try {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return { success: false, error: error.message };
  }
};


export const likePost = async (id, currentLikes = 0) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: currentLikes + 1 })
      .eq("id", id);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error liking post:", error.message);
    return { success: false, error: error.message };
  }
};