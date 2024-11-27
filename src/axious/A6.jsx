import axios from 'axios'
import React, { useEffect, useState } from 'react'

function A6() {
    const[posts, setPosts] = useState([])
    const[title, setTitle] = useState("")
    const[edit, setEdit] = useState(null)

    const API = "https://jsonplaceholder.typicode.com/posts"


    const fetchApi = async () =>{
        const respnse = await axios.get(API)
        console.log(respnse.data);
        setPosts(respnse.data.slice(0,5))
    }
    useEffect( () =>{
        fetchApi()
    },[])

    const handleAdd = async (e) => {
        e.preventDefault();
        const newPost = {title}
        const repsonse = await axios.post(API, newPost)
        setPosts([...posts, repsonse.data])
        setTitle("")

    }

    const handleDelete = async (id) =>{
        await axios.delete(`${API}/${id}`)
        setPosts(posts.filter((pst) => pst.id !== id))
    }

    

  return (
    <div>
        <h1>from A6</h1>
        <form action="">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={handleAdd}>add</button>
        </form>
        {
            posts.map((dt) =>(
                <li key={dt.id}>{dt.title}
                <button>EDIT</button>
                <button onClick={() => handleDelete(dt.id)}>DELETE</button>
                </li>
            ))
        }
    </div>
  )
}

export default A6