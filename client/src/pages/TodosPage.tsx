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
    setTitle("");
    setDescription("");
  };

  const pending = todos.filter((t) => t.status !== "completed");
  const completed = todos.filter((t) => t.status === "completed");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">My Todos</h1>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Add todo form */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Add a new todo
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="ml-auto bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Todo"}
              </button>
            </div>
          </form>
        </section>

        {/* Todo list */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Pending{" "}
            <span className="text-gray-400 font-normal">
              ({pending.length})
            </span>
          </h2>

          {loading && <p className="text-sm text-gray-400">Loading...</p>}

          {!loading && pending.length === 0 && (
            <p className="text-sm text-gray-400">No pending todos.</p>
          )}

          <ul className="space-y-2">
            {pending.map((todo) => (
              <li
                key={todo.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">
                    {todo.title}
                  </p>
                  {todo.description && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {todo.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() =>
                      dispatch(
                        updateTodo({
                          id: todo.id,
                          title: todo.title,
                          description: todo.description ?? "",
                          status: "completed",
                        }),
                      )
                    }
                    className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded hover:bg-green-100"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {completed.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Completed{" "}
              <span className="text-gray-400 font-normal">
                ({completed.length})
              </span>
            </h2>
            <ul className="space-y-2">
              {completed.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-start justify-between gap-4 opacity-60"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-gray-500 text-sm line-through truncate">
                      {todo.title}
                    </p>
                    {todo.description && (
                      <p className="text-sm text-gray-400 mt-0.5 line-through">
                        {todo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() =>
                        dispatch(
                          updateTodo({
                            id: todo.id,
                            title: todo.title,
                            description: todo.description ?? "",
                            status: "pending",
                          }),
                        )
                      }
                      className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-1 rounded hover:bg-gray-100"
                    >
                      Undo
                    </button>
                    <button
                      onClick={() => dispatch(deleteTodo(todo.id))}
                      className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default TodosPage;
