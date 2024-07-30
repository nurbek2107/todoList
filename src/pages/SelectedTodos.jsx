import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const SelectedTodos = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const selectedTodos = location.state?.selectedTodos || [];

  console.log('Selected Todos:', selectedTodos); 

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Selected Todos</h1>
      {selectedTodos.length > 0 ? (
        selectedTodos.map((todo) => (
          <div className="card bg-base-100 shadow-xl p-5 mb-5" key={todo.id}>
            <div className="flex gap-4">
            <div tabIndex="0" role="button" className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="User Avatar"
                          src={
                            todo.img ||
                            user.photoURL ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gukc7EnLg2lXrV35IoDl3SrhFbupHeJhuw&s"
                          }
                        />
                      </div>
                    </div>
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
