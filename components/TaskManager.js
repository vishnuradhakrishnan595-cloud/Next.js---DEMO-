
"use client";

import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  function addTask() {
    if (!task.trim()) {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTask("");
  }

  function completeTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => item.id !== id)
    );
  }

  const completed = tasks.filter((item) => item.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="task-container">
      <header className="header">
        <div>
          <span className="eyebrow">MY WORKSPACE</span>
          <h1>Task Manager</h1>
          <p>Organize your work. Get things done.</p>
        </div>
        <div className="date-label">
          <span>YOUR DAILY PLANNER</span>
          <strong>{new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}</strong>
        </div>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span>Total Tasks</span>
          <h2>{tasks.length}</h2>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <h2>{pending}</h2>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <h2>{completed}</h2>
        </div>
      </section>

      <section className="add-section">
        <h2>Add a New Task</h2>

        <div className="task-input">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>+ Add Task</button>
        </div>
      </section>

      <section className="list-section">
        <div className="list-heading">
          <h2>My Tasks</h2>
          <span>{tasks.length} tasks</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✓</div>
            <h3>No tasks yet</h3>
            <p>Add your first task to get started.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((item) => (
              <div className="task-item" key={item.id}>
                <div className="task-info">
                  <button
                    className={`check-button ${
                      item.completed ? "checked" : ""
                    }`}
                    onClick={() => completeTask(item.id)}
                    aria-label="Toggle task completion"
                  >
                    {item.completed ? "✓" : ""}
                  </button>

                  <span className={item.completed ? "completed" : ""}>
                    {item.title}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="complete-btn"
                    onClick={() => completeTask(item.id)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        Built with Next.js and React
      </footer>
    </div>
  );
}
