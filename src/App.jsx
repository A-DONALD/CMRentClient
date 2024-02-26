import { useState, useEffect } from 'react'
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServerError from "./errors/500";
import NotFound from "./errors/404";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/500", element: <ServerError /> },
  { path: "*", element: <NotFound /> }
])

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "system");
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;

  // theme logic
  function onWindowMatch() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add('dark');
        break;
      case "light":
        element.classList.remove('dark');
        break;
      default:
        localStorage.removeItem('theme');
        onWindowMatch();
        break;
    }
  }, [theme]);
  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
  });

  return (
    <div className="App bg-slate-100 dark:bg-gray-900">
      <RouterProvider router={router} />
    </div>
  )
}

export default App