import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");

    const res = await fetch(
      "https://stockie-mng-backend.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    login(data); // Save token + user globally

    navigate("/dashboard");
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 mb-3 bg-[#1b1f27] rounded"
      />

      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-3 mb-3 bg-[#1b1f27] rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 p-3 rounded-xl mt-2"
      >
        Login
      </button>
    </div>
  );
}
