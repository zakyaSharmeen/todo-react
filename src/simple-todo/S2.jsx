import React, { useState } from 'react'

function S2() {
    const [users, setUsers] = useState([])
    const [form, setForm] = useState({id: null, name: ""})
    const[edit, setEdit] = useState(false)



    const handleInput = (e) =>{
        const {name, value} = e.target
        setForm({...form, [name]: value})

    }

    const handleAdd = (e) =>{
        e.preventDefault()
        setUsers([...users, {...form, id: Date.now()}])
        setForm({id: null, name: ""})

    }
    const handeleDelete = (id) =>{
        setUsers(users.filter((data) => data.id !== id))
    
    }

    const handelEdit = (data) =>{
        setForm(data)
        setEdit(true)

    }

    const handleUpdate = (e) =>{
        e.preventDefault()
       
        setUsers(users.map((data) => (data.id === form.id ? form: data)))
        setForm({id: null, name: ""})
        setEdit(false)
        alert("updated")
    }




  return (
    <div>
        <form onSubmit={edit ? handleUpdate : handleAdd}>
            <h1>s2</h1>
            <input type="text" name="name" value={form.name} onChange={handleInput}/>
            <button>{edit ? "Update" : "ADD"}</button>
        </form>
        {
                users.map((data) =>(
                    <li key={data.id}>{data.name}
                    <button onClick={()=> handelEdit(data)}>EDIT</button>
                    <button onClick={() => handeleDelete(data.id)}>DELETE</button>

                    </li>

                ))
        }
        
    </div>
  )
}

export default S2