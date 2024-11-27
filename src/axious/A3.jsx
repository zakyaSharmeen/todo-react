// //------------ display the data

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'




// function A3() {
//     const [posts, setPost] = useState([])
//    

//     const api= "https://jsonplaceholder.typicode.com/posts";
//     const fetchApi = async () =>{
//         const response = await axios.get(api);
//         console.log(response.data,"recieved");
//         setPost(response.data)
//     }

//     useEffect(() =>{
//         fetchApi()
//     },[])

//   return (
//     <div>
//         <h1>crud-axious</h1>
//         <form action="">
//             <input type="text"/>
//             <button>add</button>
//         </form>
//        <ul>
//         {
//             posts.map((post) => (
//                 <li key={post.id}>{post.title}
//                 <button>Edit</button>
//                 <button>Delete</button>

//                 </li>


//             ))
//         }
//        </ul>
//     </div>
//   )
// }

// export default A3




// //----------------- display + add the data + delete

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'




// function A3() {
//     const [posts, setPost] = useState([])
//     const [title, setTitle] = useState("")
//     const[edit, setEdit] = useState(null)


//     // --------------------------
//     const api= "https://jsonplaceholder.typicode.com/posts";
//     const fetchApi = async () =>{
//         const response = await axios.get(api);
//         console.log(response.data,"recieved");
//         setPost(response.data)
//     }

//     useEffect(() =>{
//         fetchApi()
//     },[])
//     // ---------------------------------

//     // ------------------------
//     const createPost = async (e) =>{
//         e.preventDefault()
//         const newPost = {title}
//         const respnse = await axios.post(api, newPost)
//         setPost([...posts, respnse.data])
//         setTitle("")


//     }
//     // -------------------------


//     // ------------------------
//     const deletePost = async (id) =>{
//        await axios.delete(`${api}/${id}`)
//         setPost(posts.filter((pst) => pst.id !== id))
       


//     }
//     // -------------------------




//   return (
//     <div>
//         <h1>crud-axious</h1>
//         <form action="" onSubmit={createPost}>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
//             <button>add</button>
//         </form>
//        <ul>
//         {
//             posts.map((post) => (
//                 <li key={post.id}>{post.title}
//                 <button>Edit</button>
//                 <button onClick={() => deletePost(post.id)}>Delete</button>

//                 </li>


//             ))
//         }
//        </ul>
//     </div>
//   )
// }

// export default A3




//----------------------- display + add the data + delete +updat

import axios from 'axios';
import React, { useEffect, useState } from 'react'




function A3() {
    const [posts, setPost] = useState([])
    const [title, setTitle] = useState("")
    const[edit, setEdit] = useState(null)


    // --------------------------
    // fetch data from the server---Get
    const api= "https://jsonplaceholder.typicode.com/posts";
    const fetchApi = async () =>{
        const response = await axios.get(api);
        console.log(response.data,"recieved");
        setPost(response.data)
    }

    useEffect(() =>{
        fetchApi()
    },[])
    // ---------------------------------

    // ------------------------
    // create a new data
    const createPost = async (e) =>{
        e.preventDefault()
        const newPost = {title}
        const respnse = await axios.post(api, newPost)
        setPost([...posts, respnse.data])
        setTitle("")


    }
    // -------------------------


    // ------------------------
    const deletePost = async (id) =>{
       await axios.delete(`${api}/${id}`)
        setPost(posts.filter((pst) => pst.id !== id))

       


    }
    // -------------------------


    // ---------------------------
    const updatePost = async (e) =>{
        e.preventDefault()

        if(edit){
            const UpdatePost = {title}
            const respnse = await axios.put(`${api}/${edit.id}`, UpdatePost)
            setPost(posts.map((post) => (post.id === edit.id ? respnse.data : post)))
            setEdit(null)

            setTitle("")

        }
       


    }
    // ---------------------------







    // startEditing
    const startEditing = ((post) =>{
        setTitle(post.title)
        setEdit(post)

    })






  return (
    <div>
        <h1>crud-axious</h1>
        <form action="" onSubmit={edit ? updatePost : createPost}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button>{edit ? "update" : "add"}</button>
        </form>
       <ul>
        {
            posts.map((post) => (
                <li key={post.id}>{post.title}
                <button onClick={()=> startEditing(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>

                </li>


            ))
        }
       </ul>
    </div>
  )
}

export default A3