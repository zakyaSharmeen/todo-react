// src/components/TaskManager.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../rtk-thunk/PostSlice';

const Post = () => {
    const dispatch = useDispatch();
    const { items: tasks, status, error } = useSelector((state) => state.post);

    const [taskTitle, setTaskTitle] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    const handleAddTask = () => {
        if (taskTitle.trim()) {
            dispatch(addTask({ title: taskTitle }));
            setTaskTitle('');
        }
    };

    const handleUpdateTask = (task) => {
        setEditTaskId(task.id);
        setTaskTitle(task.title);
        setEditTaskId(null)
    };

    const handleSaveTask = () => {
        if (taskTitle.trim() && editTaskId) {
            dispatch(updateTask({ id: editTaskId, title: taskTitle }));
            setTaskTitle('');
            setEditTaskId(null);
        }
    };

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editTaskId) {
            handleSaveTask();
        } else {
            handleAddTask();
        }
    };

    return (
        <div>
            <h2>RTK-THUNK CRUD</h2>

            {status === 'loading' && <p>Loading tasks...</p>}
            {status === 'failed' && <p>Error: {error}</p>}

            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                {editTaskId ? (
                    <button type="button" onClick={handleSaveTask}>Save Task</button>
                ) : (
                    <button type="button" onClick={handleAddTask}>Add Task</button>
                )}
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => handleUpdateTask(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Post;
