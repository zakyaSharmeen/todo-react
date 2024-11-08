import axios from 'axios'
import React, { useEffect, useState } from 'react'

function A4() {
   const [posts, setPosts] = useState([])
   const[title, setTitle] = useState("")
   const [edit, isEdit] = useState(null)

    //    fetch and isplay the api
        const api = "https://jsonplaceholder.typicode.com/posts"
        const fetchApi = async () =>{
            const respnse = await axios.get(api)
            // console.log(respnse.data);
            setPosts(respnse.data.slice(0, 8))
        }
        useEffect(() =>{
            fetchApi()

        },[])


     // create new Posts

     const createPost = async (e) =>{
        e.preventDefault()
        const newPost  = {title}
        const response = await axios.post(api, newPost)
        setPosts([...posts, response.data])
        setTitle("")


     }
     
     const deletePost = async (id) =>{
        await axios.delete(`${api}/${id}`)
        setPosts(posts.filter((pst)=>pst.id !== id))
        
        
     }
    //  start editing
    const startEditing = ((post) =>{
        setTitle(post.title)
        isEdit(post)

    })


    const updatePost = async (e) =>{
        e.preventDefault()
        if(edit){
            const UpdatePost = {title}
            const response = await axios.put(`${api}/${edit.id}`, UpdatePost)
            setPosts(posts.map((post) => (post.id === edit.id ? response.data : post) ))
            setTitle("")
            isEdit(null)

        }



    }
    
  return (
    <div>
        <h1>AXIOS-Crud</h1>
        <form onSubmit={edit? updatePost : createPost}>
        <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button>{edit ? "Update" : "Add"}</button>
        </form>

        <ul>
            {
                posts.map((postDatas, id) =>(
                    <li key={id}>{postDatas.title}
                    <button onClick={() => startEditing(postDatas)}>EDIT</button>
                    <button onClick={() => deletePost(postDatas.id)}>Delete</button>
                    </li>

                ))
            }
        </ul>

        
    </div>

  )
}

export default A4