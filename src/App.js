import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrEdit = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask('');
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>📝 Todo List</h1>
      <div className="input-section">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter a task..."
        />
        <button onClick={handleAddOrEdit}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? 'completed' : ''}>
            {t.text}
            <div>
              <button onClick={() => toggleComplete(index)}>
                {t.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
