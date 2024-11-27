


import axios from "axios";
import React, { useEffect, useState } from "react";

function A5() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(null);

  const api = "https://jsonplaceholder.typicode.com/posts";

  // Fetch Posts
  const fetchApi = async () => {
    try {
      const response = await axios.get(api);
      setPosts(response.data.slice(0, 6));
    } catch (error) {
      console.error("Failed to fetch posts:", error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Create Post
  const createPost = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    try {
      const newPost = { title };
      const response = await axios.post(api, newPost);
      setPosts([...posts, response.data]);
      setTitle("");
    } catch (error) {
      console.error("Failed to create post:", error.message);
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setPosts(posts.filter((pst) => pst.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error.message);
    }
  };

  // Start Edit
  const startEdit = (post) => {
    setTitle(post.title);
    setEdit(post);
  };

  // Update Post
  const updatePost = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    if (edit) {
      try {
        const updatedPost = { title };
        const response = await axios.put(`${api}/${edit.id}`, updatedPost);
        setPosts(
          posts.map((pst) =>
            pst.id === edit.id ?response.data : pst
          )
        );
        setTitle("");
        setEdit(null);
      } catch (error) {
        alert("not able to update")
        console.error("Failed to update post:", error.message);
      }
    }
  };

  return (
    <div>
      <h1>from A5</h1>
      <form onSubmit={edit ? updatePost : createPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>{edit ? "UPDATE" : "Add"}</button>
      </form>
      {posts.map((dt) => (
        <li key={dt.id}>
          {dt.title}
          <button onClick={() => startEdit(dt)}>EDIT</button>
          <button onClick={() => deletePost(dt.id)}>DELETE</button>
        </li>
      ))}
    </div>
  );
}

export default A5;


