import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './app/app'
import Login from './components/pages/login/login'
import Dashboard from  './components/pages/dashboard/dashboard';
import SignUp from './components/pages/sign_up/sign-up'
import ForgotPassword from './components/pages/forgot_password/forgot-pasword'
import SearchTest from './components/pages/test/search_test';
import ItemPage from './components/pages/item/item';
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
          <Route path="/register" element={<SignUp />} />
          <Route path="/passreset" element={<ForgotPassword />} />
          <Route path="/item" element={<ItemPage/>} />
          <Route path="/searchtest" element={<SearchTest/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
