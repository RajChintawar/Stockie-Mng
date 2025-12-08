import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Rankings from "./pages/Rankings";
import Suggestion from "./pages/Suggestion";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

<Route path="/portfolio" element={<Portfolio />} />


<Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
<Route path="/rankings" element={<Protected><Rankings /></Protected>} />
<Route path="/ai-suggest" element={<Protected><Suggestion /></Protected>} />


<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h2 className="text-center text-red-400 p-8">Login first dumbass 😭🔥</h2>;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Portfolio />
      </div>
    ),
  },
  {
    path: "/Dashboard",
    element: (
      <div>
        <Navbar />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/rankings",
    element: (
      <div>
        <Navbar />
        <Rankings />
      </div>
    ),
  },
  {
  path: "/suggestion",
  element: (
    <div>
      <Navbar />
      <Suggestion />
    </div>
  ),
},

]);

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/rankings"
  element={
    <ProtectedRoute>
      <Rankings />
    </ProtectedRoute>
  }
/>

<Route
  path="/ai"
  element={
    <ProtectedRoute>
      <Suggestion />
    </ProtectedRoute>
  }
/>







export default function App() {
  return <RouterProvider router={router} />;
}

