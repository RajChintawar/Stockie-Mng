import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Rankings from "./pages/Rankings";
import Suggestion from "./pages/Suggestion";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

/* ---------------- PROTECTED ROUTE ---------------- */

function ProtectedRoute({ children }) {
  const { user, loading } =
    useContext(AuthContext);

  /* Firebase restoring session */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  /* Not logged in */
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

/* ---------------- APP ---------------- */

export default function App() {
  const { user, loading } =
    useContext(AuthContext);

  /* Wait for Firebase auth restore */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0d12] text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col bg-[#0b0d12] text-white">

        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <main className="flex-grow">

          <Routes>

            {/* ROOT ROUTE */}
            <Route
              path="/"
              element={
                user
                  ? (
                    <Navigate
                      to="/portfolio"
                      replace
                    />
                  )
                  : (
                    <Navigate
                      to="/login"
                      replace
                    />
                  )
              }
            />

            {/* AUTH PAGES */}
            <Route
              path="/login"
              element={
                user
                  ? (
                    <Navigate
                      to="/portfolio"
                      replace
                    />
                  )
                  : <Login />
              }
            />

            <Route
              path="/register"
              element={
                user
                  ? (
                    <Navigate
                      to="/portfolio"
                      replace
                    />
                  )
                  : <Register />
              }
            />

            {/* PORTFOLIO */}
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute>
                  <Portfolio />
                </ProtectedRoute>
              }
            />

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* RANKINGS */}
            <Route
              path="/rankings"
              element={
                <ProtectedRoute>
                  <Rankings />
                </ProtectedRoute>
              }
            />

            {/* AI ADVICE */}
            <Route
              path="/ai-advice"
              element={
                <ProtectedRoute>
                  <Suggestion />
                </ProtectedRoute>
              }
            />

            {/* INVALID ROUTES */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}