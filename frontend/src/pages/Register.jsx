import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    fetch("https://stockie-mng-backend.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) setError(data.error);
        else navigate("/login");
      });
  };

  return (
    <div className="p-8 max-w-lg mx-auto text-white space-y-6">
      <h2 className="text-3xl font-bold">Register</h2>

      {error && <p className="text-red-400">{error}</p>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="p-3 rounded-xl bg-[#1b1f27] w-full"
      />

      <input
        name="email"
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
        className="bg-green-600 px-6 py-2 rounded-xl w-full"
      >
        Register
      </button>
    </div>
  );
}
