import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Rankings from "./pages/Rankings";
import Suggestion from "./pages/Suggestion";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/portfolio",
    element: (
      <div>
        <Navbar />
        <Portfolio />
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

export default function App() {
  return <RouterProvider router={router} />;
}

