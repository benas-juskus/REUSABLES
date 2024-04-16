import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './app/app'
// import App from './app/app'
import Login from './components/pages/login/login'
// import Dashboard from  './components/pages/dashboard/dashboard';
import SignUp from './components/pages/sign_up/sign-up'
import ForgotPassword from './components/pages/forgot_password/forgot-pasword'
import ItemPage from './components/pages/item/item'
import Dashboard from  './components/pages/dashboard/dashboard';
import LiveFeedComponent from './components/pages/home_page/LiveFeedComponent';
import LogedIn from './components/pages/home_page/LogedIn';
import Header from './components/layout/header';
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/item" element={<ItemPage/>} />
          <Route path="/livefeed" element={<><Header /><LiveFeedComponent width={"19%"} ammount = {5} /> </>} />
          <Route path="/logedin" element={<LogedIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
