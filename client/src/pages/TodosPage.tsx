import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../store/todosSlice";
import { logout } from "../store/authSlice";

function TodosPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { todos, loading, error } = useAppSelector((state) => state.todos);

  useEffect(() => {
    const load = async () => dispatch(fetchTodos());
    load();
  }, [dispatch]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(createTodo({ title, description }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Todos</h1>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
        {loading && <div>Loading...</div>}

        {!loading && (
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Todo"}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {todos.length === 0 && !loading && (
              <p className="text-gray-500 mt-4">No todos yet. Create one!</p>
            )}

            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 border rounded mt-2"
              >
                <div>
                  <p
                    className={`font-medium ${todo.status === "completed" ? "line-through text-gray-400" : ""}`}
                  >
                    {todo.title}
                  </p>
                  <p className="text-sm text-gray-500">{todo.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateTodo({
                          id: todo.id,
                          title: todo.title,
                          description: todo.description ?? "",
                          status:
                            todo.status === "completed"
                              ? "pending"
                              : "completed",
                        }),
                      )
                    }
                    className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodosPage;
