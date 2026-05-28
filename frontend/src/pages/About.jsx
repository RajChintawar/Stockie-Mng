export default function About() {

  const features = [
    {
      title: "Portfolio Tracking",
      desc:
        "Create and manage diversified investment portfolios with real-time calculations.",
    },

    {
      title: "AI Suggestions",
      desc:
        "Get AI-powered portfolio analysis, diversification insights, and investment strategies.",
    },

    {
      title: "Interactive Dashboard",
      desc:
        "Visualize portfolio growth, allocation weightage, and stock performance using charts.",
    },

    {
      title: "Leaderboard Rankings",
      desc:
        "Compare portfolio performance with other investors on the leaderboard.",
    },

    {
      title: "Secure Authentication",
      desc:
        "Firebase authentication with Google login and protected user sessions.",
    },
  ];

  const steps = [
    "Login or create an account",
    "Add stocks with prices and weightage",
    "Calculate your portfolio",
    "Analyze dashboard insights",
    "Get AI-powered recommendations",
    "Track rankings against others",
  ];

  const techStack = [
    "React.js",
    "Node.js",
    "MongoDB",
    "Firebase Auth",
    "Groq AI",
    "TailwindCSS",
    "Recharts",
    "Render",
  ];

  return (

    <div className="min-h-screen text-white px-6 py-12 max-w-7xl mx-auto">

      {/* HERO */}

      <div className="text-center mb-16">

        <h1
          className="text-5xl md:text-6xl font-extrabold
          bg-gradient-to-r from-blue-400 to-cyan-300
          bg-clip-text text-transparent"
        >

          Mirrafolio

        </h1>

        <p
          className="mt-6 text-lg md:text-xl text-gray-300
          max-w-3xl mx-auto leading-relaxed"
        >

          An AI-powered stock portfolio management platform
          built to simplify investment analysis, portfolio
          optimization, and financial visualization.

        </p>

      </div>

      {/* FEATURES */}

      <div className="mb-20">

        <h2 className="text-3xl font-bold mb-8">

          Core Features

        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2
          xl:grid-cols-3 gap-6"
        >

          {features.map((f, i) => (

            <div
              key={i}

              className="p-6 rounded-2xl
              bg-[#151821]/70 border border-white/10
              shadow-xl hover:scale-[1.02]
              transition duration-300"
            >

              <h3 className="text-2xl font-bold text-blue-400 mb-3">

                {f.title}

              </h3>

              <p className="text-gray-300 leading-relaxed">

                {f.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* HOW IT WORKS */}

      <div className="mb-20">

        <h2 className="text-3xl font-bold mb-8">

          How It Works

        </h2>

        <div className="space-y-5">

          {steps.map((step, i) => (

            <div
              key={i}

              className="flex items-center gap-5
              p-5 rounded-2xl bg-[#151821]/70
              border border-white/10"
            >

              <div
                className="w-10 h-10 rounded-full
                bg-blue-600 flex items-center
                justify-center font-bold"
              >

                {i + 1}

              </div>

              <p className="text-lg text-gray-200">

                {step}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* TECH STACK */}

      <div className="mb-20">

        <h2 className="text-3xl font-bold mb-8">

          Tech Stack

        </h2>

        <div className="flex flex-wrap gap-4">

          {techStack.map((tech, i) => (

            <div
              key={i}

              className="px-5 py-3 rounded-xl
              bg-gradient-to-r from-blue-600
              to-cyan-500 font-semibold shadow-lg"
            >

              {tech}

            </div>

          ))}

        </div>

      </div>

      {/* DISCLAIMER */}

      <div
        className="p-6 rounded-2xl
        bg-red-500/10 border border-red-400/20"
      >

        <h2 className="text-2xl font-bold text-red-300 mb-3">

          Disclaimer

        </h2>

        <p className="text-gray-300 leading-relaxed">

          Mirrafolio provides AI-generated investment insights
          for educational and analytical purposes only.
          This platform does not provide financial advice.
          Always conduct your own research before investing.

        </p>

      </div>

    </div>
  );
}