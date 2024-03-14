import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import Login from './components/pages/login/login'
import Dashboard from  './components/pages/dashboard/dashboard';
import Search_test from './components/pages/test/search_test';
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
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/searchtest" element={<Search_test/>} />
        </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
