
import React, { useState } from 'react';

function S1() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ id: null, name: "" });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Function to add a new user
    const handleAdd = (e) => {
        e.preventDefault();
        setUsers([...users, { ...form, id: Date.now() }]);
        setForm({ id: null, name: "" });
    };

    // Function to update an existing user
    const handleEdit = (data) => {
        setForm(data);
        setIsEditing(true);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        setUsers(users.map((data) => (data.id === form.id ? form : data)));
        // resetForm();
        setForm({ id: null, name: "" });
        setIsEditing(false);
    };

   

    const handleDelete = (id) => {
        setUsers(users.filter((data) => data.id !== id));
    };

    

    return (
        <div>
              <h1>CRUD - APP - SIMPLE</h1>
            <form onSubmit={isEditing ? handleUpdate : handleAdd}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                />
                <button>{isEditing ? "Update" : "Add"}</button>
            </form>
          
            <ul>
                {users.map((data) => (
                    <li key={data.id}>
                        {data.name}
                        <button onClick={() => handleEdit(data)}>EDIT</button>
                        <button onClick={() => handleDelete(data.id)}>DELETE</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default S1;
