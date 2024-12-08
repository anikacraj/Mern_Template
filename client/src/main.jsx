import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Home from './Pages/UserPages/Home.jsx'
import UserContactPage from './Pages/UserPages/UserContactPages/UserContactPage.jsx'
import UserProductsPage from './Pages/UserPages/UserProductsPage/UserProductsPage.jsx'
import UserAboutPage from './Pages/UserPages/UserAboutPages/UserAboutPage.jsx'
import NoFoundPage from './Pages/NoFoundPage.jsx'
import UserHeader from './Components/UserComponents/UserHeaderComponents/UserHeader.jsx'
import UserSignin from './Pages/UserPages/UserRegister/UserSignin.jsx'
import UserLogin from './Pages/UserPages/UserRegister/UserLogin.jsx'
import NewMeeting from './Pages/UserPages/NewMeeting/NewMeeting.jsx'
import GuestMeeting from './Pages/GuestMeeting/GuestMeeting.jsx'
import Hostdashboard from './Pages/Hostdashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserHeader />,
    children: [
      { path: '/', element: <Home /> },
      // Home page with dynamic userId route
      { path: '/:userId', element: <Home /> },
      { path: 'contact', element: <UserContactPage /> },
      { path: 'product', element: <UserProductsPage /> },
      { path: 'register', element: <UserSignin /> },
      { path: 'login', element: <UserLogin /> },
    ],
  },
  { path: '/:userId/newMeeting', element: <NewMeeting /> },
  { path: '/:userId/hostdashboard', element: <Hostdashboard /> },
  { path: '/about', element: <UserAboutPage /> },
  { path: '/guestMeeting', element: <GuestMeeting /> },

  { path: '*', element: <NoFoundPage /> }, // Wildcard for 404
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
