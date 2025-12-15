export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0f1117] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left */}
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Mirrafolio</span>.  
All rights reserved. Touch at your own risk.        </p>

        {/* Right */}
        <p className="text-sm text-center sm:text-right">
          Built by{" "}
          <span className="text-white font-semibold hover:text-indigo-400 transition">
            Ragxx
          </span>{" "}
         | Powered By{" "}
          <span className="text-white font-semibold hover:text-emerald-400 transition">
            ChatGPT
          </span>
        </p>
      </div>
    </footer>
  );
}
