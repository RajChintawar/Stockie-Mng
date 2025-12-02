import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#13151d] border-b border-[#1f2230] px-8 py-4 shadow-lg flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
        Stockie
      </h1>

      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-blue-400 transition">Dashboard</Link>
        <Link to="/portfolio" className="hover:text-blue-400 transition">Portfolio</Link>
        <Link to="/rankings" className="hover:text-blue-400 transition">Rankings</Link>
        <Link to="/suggestion" className="hover:text-blue-400">AI Advice</Link>

      </div>
    </nav>
  );
}
