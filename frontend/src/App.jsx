import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./component/TodoItems";

// const API_URL = "http://localhost:3000/api/tasks"; // ✅ make sure backend runs on port 5000
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        completed: !completed,
      });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating completion:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  // Save edit
  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { title: editTitle });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditingId(null);
      setEditTitle("");
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>📝 To-Do List</h1>

      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            editingId={editingId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            onToggle={toggleComplete}
            onDelete={deleteTask}
            onEdit={startEditing}
            onSave={saveEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
