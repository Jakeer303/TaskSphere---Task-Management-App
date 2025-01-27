import React, { useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask('');
    }
  };

  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );

      if (targetCategory === 'delete') {
        return {
          ...prevTasks,
          [currentCategory]: updatedCurrent,
        };
      }

      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrent,
        [targetCategory]: updatedTarget,
      };
    });
  };

  const clearAllTasks = () => {
    setTasks({ todo: [], ongoing: [], completed: [] });
  };

  const getDropdownStyle = (category) => {
    switch (category) {
      case 'todo':
        return { backgroundColor: '#ffe6e6', color: '#dc3545' }; // Red
      case 'ongoing':
        return { backgroundColor: '#fffbea', color: '#ffc107' }; // Yellow
      case 'completed':
        return { backgroundColor: '#e6ffe6', color: '#28a745' }; // Green
      default:
        return { backgroundColor: 'white', color: 'black' }; // Default
    }
  };

  return (
    <div className="app">
      <div className="home">
        <form
          className="task-form"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <input
            type="text"
            placeholder="Enter task..."
            className="task-input"
            value={task}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="add-task-button"
            onClick={addTask}
          >
            ADD TASK
          </button>
          <button
            type="button"
            className="clear-all-button"
            onClick={clearAllTasks}
          >
            CLEAR ALL
          </button>
        </form>
        <div className="task-sections">
          {['todo', 'ongoing', 'completed'].map((category) => (
            <div className="task-section" key={category}>
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Tasks</h2>
              <ul>
                {tasks[category].map((t, index) => (
                  <li key={index}>
                    {t}
                    <select
                      className="task-action-dropdown"
                      style={getDropdownStyle(category)}
                      onChange={(e) =>
                        moveTask(category, e.target.value, t)
                      }
                    >
                      <option value="">Select task state</option>
                      {category !== 'todo' && (
                        <option value="todo" style={{ color: '#dc3545' }}>
                          Move to To-Do
                        </option>
                      )}
                      {category !== 'ongoing' && (
                        <option value="ongoing" style={{ color: '#ffc107' }}>
                          Move to Ongoing
                        </option>
                      )}
                      {category !== 'completed' && (
                        <option value="completed" style={{ color: '#28a745' }}>
                          Move to Completed
                        </option>
                      )}
                      <option value="delete" style={{ color: '#000' }}>
                        Delete
                      </option>
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;