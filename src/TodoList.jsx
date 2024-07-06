import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  let [todos, setTodo] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);

  let [newTask, setNewTask] = useState("");

  let addTask = () => {
    setTodo((prevTask) => {
      return [...prevTask, { task: newTask, id: uuidv4(), isDone: false }];
    });
    setNewTask("");
  };

  let updateTodoVal = (event) => {
    setNewTask(event.target.value);
  };

  let deleteTodo = (id) => {
    let copy = todos.filter((x) => x.id != id);
    setTodo(copy);
  };

  let deleteAll = () => {
    setTodo([{ task: "", id: uuidv4(), isDone: false }]);
  };

  let markAsDone = (id) => {
    setTodo((prevEl) =>
      prevEl.map((el) => {
        if (el.id == id) return { ...el, isDone: true };
        else return el;
      })
    );
  };

  let markAllDone = () => {
    setTodo((prevEl) =>
      prevEl.map((el) => {
        return { ...el, isDone: true };
      })
    );
  };

  let isEmpty = () => {
    if (todos.task == "") return false;
    else return true;
  };

  return (
    <div className="body">
      <input
        className="todoInput"
        placeholder="Add a task..."
        value={newTask}
        onChange={updateTodoVal}
      />
      <br />
      <br />
      <button onClick={addTask} className="btn add-task">
        Add Task
      </button>
      <br />

      <br />
      <hr />
      <h2>Task Todo</h2>
      <ol className="ul">
        {todos.map((val) => (
          <li
            key={val.id}
            className="list"
            style={!isEmpty ? { display: "none" } : {}}
          >
            <div
              className="div-li"
              style={val.task == "" ? { display: "none" } : {}}
            >
              <span
                className="text"
                style={val.isDone ? { textDecoration: "line-through" } : {}}
              >
                {val.task}
              </span>
              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div className="btns">
                <button
                  className={"btn MasD"}
                  onClick={() => markAsDone(val.id)}
                >
                  Mark As Done
                </button>
                <button className="btn dlt" onClick={() => deleteTodo(val.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <button className="AllDone" onClick={markAllDone}>
        Mark All Done
      </button>
      <button className="AllDelete" onClick={deleteAll}>
        Delete All
      </button>
    </div>
  );
}
