import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './routes/Route.jsx'
import React from 'react'
import { RouterProvider } from "react-router-dom";
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} >
  <App />
  </RouterProvider>
</React.StrictMode>
)
