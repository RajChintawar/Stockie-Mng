import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import {
  useNavigate,
  Link,
} from "react-router-dom";

export default function Login() {
  const {
    login,
    googleLogin,
    forgotPassword,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- EMAIL LOGIN ---------------- */

  const handleLogin = async () => {
    setError("");

    try {
      await login(
  form.email,
  form.password
);

/* CLEAR OLD DATA */

localStorage.removeItem(
  "portfolioStocks"
);

localStorage.removeItem(
  "portfolioResult"
);

localStorage.removeItem(
  "totalAmount"
);

localStorage.removeItem(
  "pf_username"
);

navigate("/portfolio");
    } catch (err) {
      setError("Invalid credentials 💀");
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */

  const handleGoogleLogin = async () => {
    setError("");

    try {
     await googleLogin();

/* CLEAR OLD DATA */

localStorage.removeItem(
  "portfolioStocks"
);

localStorage.removeItem(
  "portfolioResult"
);

localStorage.removeItem(
  "totalAmount"
);

localStorage.removeItem(
  "pf_username"
);

navigate("/portfolio");

    } catch (err) {
  console.log(err);
  setError(err.message);
}
  };

  /* ---------------- FORGOT PASSWORD ---------------- */

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError(
        "Enter email first 🤡"
      );

      return;
    }

    try {
      await forgotPassword(form.email);

      setMessage(
        "Password reset email sent 📩"
      );

    } catch (err) {
      setError(
        "Failed to send reset email 💀"
      );
    }
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto">

      <h2 className="text-3xl font-bold mb-4">
        Login
      </h2>

      {error && (
        <p className="text-red-400 mb-3">
          {error}
        </p>
      )}

      {message && (
        <p className="text-green-400 mb-3">
          {message}
        </p>
      )}

      {/* EMAIL */}
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 mb-3 bg-[#1b1f27] rounded"
      />

      {/* PASSWORD */}
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-3 mb-3 bg-[#1b1f27] rounded"
      />

      {/* LOGIN BUTTON */}
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 p-3 rounded-xl mt-2 hover:bg-blue-700"
      >
        Login
      </button>

      {/* GOOGLE LOGIN */}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white text-black p-3 rounded-xl mt-3 font-semibold hover:bg-gray-200"
      >
        Continue with Google
      </button>

      {/* FORGOT PASSWORD */}
      <button
        onClick={handleForgotPassword}
        className="mt-4 text-blue-400 hover:underline"
      >
        Forgot Password?
      </button>

      {/* REGISTER LINK */}
      <p className="mt-5 text-gray-400">
        Don’t have an account?{" "}

        <Link
          to="/register"
          className="text-purple-400"
        >
          Register
        </Link>
      </p>

    </div>
  );
}