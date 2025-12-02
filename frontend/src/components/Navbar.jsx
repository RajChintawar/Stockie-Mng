import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#151821] border-b border-white/10 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-white">
          Stockie
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-300 text-lg">
          <Link to="/" className="hover:text-blue-400 transition">Portfolio</Link>

          <Link to="/Dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/rankings" className="hover:text-white">Rankings</Link>
          <Link to="/suggestion" className="hover:text-white">AI Advice</Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden mt-3 bg-[#1b1f27] p-4 rounded-xl space-y-4 text-gray-200 text-lg">
         <Link onClick={() => setOpen(false)} to="/" className="block">Portfolio</Link>

          <Link onClick={() => setOpen(false)} to="/Dashboard" className="block">Dashboard</Link>
          <Link onClick={() => setOpen(false)} to="/rankings" className="block">Rankings</Link>
          <Link onClick={() => setOpen(false)} to="/suggestion" className="block">AI Advice</Link>
        </div>
      )}
    </nav>
  );
}
