import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const registerUser = async () => {
    const res = await fetch("https://stockie-mng-backend.onrender.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.error) return alert(data.error);

    alert("Account created! Now login 🔥");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="p-3 w-full bg-[#1b1f27] rounded-xl mb-3"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="p-3 w-full bg-[#1b1f27] rounded-xl mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="p-3 w-full bg-[#1b1f27] rounded-xl mb-3"
        onChange={handleChange}
      />

      <button
        onClick={registerUser}
        className="bg-blue-600 px-5 py-2 rounded-xl"
      >
        Create Account
      </button>
    </div>
  );
}
