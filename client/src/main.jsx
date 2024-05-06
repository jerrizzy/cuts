import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BarbersList from './components/BarbersList.jsx'
import BarberPage from './components/BarberPage.jsx'
import Home from './components/Home.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Not Found</h1>,
    children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/barbers",
      element: <BarbersList />,
    },
    {
      path: "/barbers/:id",
      element: <BarberPage />,
    },
    {
      path: "/favorites",
      element: <h1>favorites list</h1>,
    }
  ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
