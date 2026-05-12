import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const { loading, error, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/todos");
  }, [navigate, token]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      return;
    }
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {repeatPasswordError && (
            <div className="text-red-500 mt-0 mb-4">{repeatPasswordError}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
