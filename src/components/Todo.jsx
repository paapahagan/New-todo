import React, { useReducer, useContext } from "react";

function appReducer(state, action) {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          completed: false,
        },
      ];
    }
    case "delete": {
      return state.filter((item) => item.id !== action.payload);
    }
    default:
      break;
  }
}

const Context = React.createContext();

function Todo() {
  const [state, dispatch] = useReducer(appReducer, []);
  return (
    <Context.Provider value={dispatch}>
      <h1>Todo App</h1>
      <button onClick={() => dispatch({ type: "add" })}>New Todo</button>
      <br />
      <br />
      <TodoList items={state} />
    </Context.Provider>
  );
  function TodoList({ items }) {
    return items.map((item) => <TodoItem key={item.id} {...item} />);
  }

  function TodoItem({ id, completed, text }) {
    const dispatch = useContext(Context);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <input type="checkbox" checked={completed} />
        <input type="text" defaultValue={text} />
        <button onClick={() => dispatch({ type: "delete", payload: id })}>
          Delete
        </button>
      </div>
    );
  }
}

export default Todo;
