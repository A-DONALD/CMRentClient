import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Editor from "./pages/Editor";
import Admin from "./pages/Admin";
import Board from "./pages/Board";
import ServerError from "./errors/500";
import NotFound from "./errors/404";
import Unauthorized from "./errors/401";
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

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
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="board" element={<Board />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="user" element={<User />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App