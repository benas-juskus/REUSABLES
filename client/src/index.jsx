import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import Login from './components/pages/login/login'
import Header from './components/layout/header'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
        <>
          <Route path="/" element={<Login />} />
          <Route path="/header" element={<Header />} />
        </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
