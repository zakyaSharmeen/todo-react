import React, { useState, useEffect } from "react";
import axios from "axios";

const A1 = () => {
  const [posts, setPosts] = useState([]); // Stores the posts
  const [title, setTitle] = useState(""); // For new post title
  const [editPost, setEditPost] = useState(null); // To manage editing posts

  const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Mock API


  // Fetch posts (Read operation)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Create a new post (Create operation)
  const createPost = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title };
      const response = await axios.post(apiUrl, newPost);
      setPosts([...posts, response.data]); // Add new post to the list
      setTitle("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Update an existing post (Update operation)
  const updatePost = async (e) => {
    e.preventDefault();
    if (editPost) {
      try {
        const updatedPost = { title };
        const response = await axios.put(`${apiUrl}/${editPost.id}`, updatedPost);
        setPosts(
          posts.map((post) => (post.id === editPost.id ? response.data : post))
        );
        setEditPost(null); // Clear edit mode
        setTitle("");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  // Delete a post (Delete operation)
  const deletePost = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setPosts(posts.filter((post) => post.id !== id)); // Remove deleted post
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Edit a post
  const startEditing = (post) => {
    setEditPost(post);
    setTitle(post.title);
  };

  return (
    <div>
      <h1>CRUD App with Axios</h1>

      {/* Form for creating or editing posts */}
      <form onSubmit={editPost ? updatePost : createPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <button type="submit">{editPost ? "Update Post" : "Create Post"}</button>
      </form>

      {/* List of posts */}
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <button onClick={() => startEditing(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default A1;
