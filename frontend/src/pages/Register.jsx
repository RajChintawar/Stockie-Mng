import { useState, useContext } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const {
    register,
    googleLogin,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- REGISTER ---------------- */

  const handleRegister = async () => {
    setError("");

    try {
      await register(
        form.email,
        form.password
      );

      navigate("/portfolio");

    } catch (err) {
      setError(
        "Registration failed 💀"
      );
    }
  };

  /* ---------------- GOOGLE REGISTER ---------------- */

  const handleGoogleRegister = async () => {
    setError("");

    try {
      await googleLogin();

      navigate("/portfolio");

    } catch (err) {
      setError(
        "Google signup failed 😭"
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-white">

      <h2 className="text-3xl font-bold mb-4">
        Register
      </h2>

      {error && (
        <p className="text-red-400 mb-3">
          {error}
        </p>
      )}

      {/* NAME */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="p-3 w-full bg-[#1b1f27] rounded-xl mb-3"
      />

      {/* EMAIL */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="p-3 w-full bg-[#1b1f27] rounded-xl mb-3"
      />

      {/* PASSWORD */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="p-3 w-full bg-[#1b1f27] rounded-xl mb-3"
      />

      {/* REGISTER BUTTON */}
      <button
        onClick={handleRegister}
        className="w-full bg-purple-600 p-3 rounded-xl hover:bg-purple-700"
      >
        Create Account
      </button>

      {/* GOOGLE SIGNUP */}
      <button
        onClick={handleGoogleRegister}
        className="w-full bg-white text-black p-3 rounded-xl mt-3 font-semibold hover:bg-gray-200"
      >
        Continue with Google
      </button>

      {/* LOGIN LINK */}
      <p className="mt-5 text-gray-400">
        Already have an account?{" "}

        <Link
          to="/login"
          className="text-blue-400"
        >
          Login
        </Link>
      </p>

    </div>
  );
}