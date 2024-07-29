// src/pages/SelectedTodos.js
import { useLocation } from "react-router-dom";

const SelectedTodos = () => {
  const location = useLocation();
  const selectedTodos = location.state?.selectedTodos || [];

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Selected Todos</h1>
      {selectedTodos.length > 0 ? (
        selectedTodos.map((todo) => (
          <div className="card bg-base-100 shadow-xl p-5 mb-5" key={todo.id}>
            <div className="flex gap-4">
              <p className="text-xl">
                <span className="text-slate-600">ID:</span> {todo.age}
              </p>
              <p className="text-xl">
                <span className="text-slate-600">Family Name:</span> {todo.familyName}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No selected todos</p>
      )}
    </div>
  );
};

export default SelectedTodos;
