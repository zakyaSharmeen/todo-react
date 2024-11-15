import React, { useState } from 'react'

function S3() {

  const[users, setUsers] = useState([])
  const[form, setForm] = useState({id: null, name: ""})
  const[edit, setEdit] = useState(false)



  const handelInput = (e) =>{
    const {name, value} = e.target
    setForm({...form, [name]: value})

  }

  const handleAdd = (e) =>{
    e.preventDefault()
    setUsers([...users, {...form, id: Date.now()}])
    setForm({id:null, name: ""})

  }

  const handleDelete = (id) =>{
    setUsers(users.filter((data) => data.id !== id))

  }

  const handelEdit = (dt) =>{
    setForm(dt)
    setEdit(true)

  }

  const handleUpdate = (e) =>{
    e.preventDefault()
    setUsers(users.map((dt) => (dt.id === form.id ? form : dt)))
    setForm({id: null, name: ""})
    setEdit(false)

  }




  return (
    <div>
      <h1>SIMPLE TO-DO</h1>
     <form onSubmit={edit ? handleUpdate : handleAdd}>
     <input type="text" name='name' value={form.name} onChange={handelInput}/>
     <button>{edit ? "UPDATE": "ADD"}</button>
     </form>

     {
      users.map((dt) =>(
        <li key={dt.id}>{dt.name}
        <button onClick={() => handelEdit(dt)}>EDIT</button>
        <button onClick={() => handleDelete(dt.id)}>DELETE</button></li>
       
      ))
     }
    </div>
  )
}

export default S3