import React from "react"
import Home from "./pages/Home"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from "./pages/Login";
import ServerError from "./errors/500";
import NotFound from "./errors/404";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/500", element: <ServerError /> },
  { path: "*", element: <NotFound /> }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App