import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#151821]/90 backdrop-blur-xl border-b border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          Mirrafolio
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-lg">

          {/* ALWAYS VISIBLE */}
          <Link to="/" className="hover:text-blue-400 transition">Portfolio</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/rankings" className="hover:text-white">Rankings</Link>
          <Link to="/ai-advice" className="hover:text-white">AI Advice</Link>

          {/* SHOW LOGIN/REGISTER ONLY WHEN LOGGED OUT */}
          {!user && (
            <>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="px-4 py-2 border border-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
            </>
          )}

          {/* SHOW LOGOUT WHEN LOGGED IN */}
          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {open && (
        <div className="md:hidden mt-3 bg-[#1b1f27] p-4 rounded-xl space-y-4 text-gray-200 text-lg">

          <Link onClick={() => setOpen(false)} to="/" className="block">
            Portfolio
          </Link>
          <Link onClick={() => setOpen(false)} to="/dashboard" className="block">
            Dashboard
          </Link>
          <Link onClick={() => setOpen(false)} to="/rankings" className="block">
            Rankings
          </Link>
          <Link onClick={() => setOpen(false)} to="/ai-advice" className="block">
            AI Advice
          </Link>

          {!user && (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/register"
                className="block bg-purple-600 text-center py-2 rounded-lg"
              >
                Register
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="block border border-blue-400 text-center py-2 rounded-lg"
              >
                Login
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full bg-red-500 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
