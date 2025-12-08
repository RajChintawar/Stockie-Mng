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

  const submit = () => {
    fetch("https://stockie-mng-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.error || "Login failed 😭🔥");
        } else {
          login(data);
          navigate("/dashboard");
        }
      });
  };

  return (
    <div className="p-8 max-w-lg mx-auto text-white space-y-6">
      <h2 className="text-3xl font-bold">Login</h2>

      {error && <p className="text-red-400">{error}</p>}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="p-3 rounded-xl bg-[#1b1f27] w-full"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="p-3 rounded-xl bg-[#1b1f27] w-full"
      />

      <button
        onClick={submit}
        className="bg-blue-600 px-6 py-2 rounded-xl w-full"
      >
        Login
      </button>
    </div>
  );
}
