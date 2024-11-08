import React, { useState } from 'react'

function S1() {

    const [users, setUsers] = useState([])
    const [form , setForm] = useState({id: null, name: ""})
    const [isEditing, setIsEditing] = useState(false)

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isEditing){
            setUsers(users.map((data) => data.id === form.id ? form: data))
            setIsEditing(false)
        }else{
            setUsers([...users, {...form, id: Date.now()}])

        }
        setForm({id: null, name: ""})
    }

    const handleDelete =(id) =>{
        setUsers(users.filter((data) => data.id !==id))

    }
    const handleEdit =(data) =>{
        setForm(data)
        setIsEditing(true)

    }




  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={form.name} onChange={handleInputChange}/>
            <button>{isEditing? "update": "add"}</button>
        </form>
        <h1>CRUD -APP-SIMPLE</h1>
        {
            users.map((data) => (
                <li key={data.id}>{data.name}
                <button onClick={() => handleEdit(data)}>EDIT</button>
                <button onClick={()=> handleDelete(data.id)}>DELETE</button>

                </li>
            ))
        }

    </div>
  )
}

export default S1