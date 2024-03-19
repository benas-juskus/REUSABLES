import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import Login from './components/pages/login/login'
import Dashboard from  './components/pages/dashboard/dashboard';
import CategoriesManager from './components/pages/categoriesManager/categoriesManager';
import CreateListing from './components/pages/createListing/createListing';

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
          <Route path="/categories" element={<CategoriesManager />} />
          <Route path="/create" element={<CreateListing />} />
        </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
