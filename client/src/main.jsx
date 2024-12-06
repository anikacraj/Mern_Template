import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import './index.css'
import Home from './Pages/UserPages/Home.jsx'
import UserContactPage from './Pages/UserPages/UserContactPages/UserContactPage.jsx'
import UserProductsPage from './Pages/UserPages/UserProductsPage/UserProductsPage.jsx'
import UserAboutPage from './Pages/UserPages/UserAboutPages/UserAboutPage.jsx'
import NoFoundPage from './Pages/NoFoundPage.jsx'
import UserHeader from './Components/UserComponents/UserHeaderComponents/UserHeader.jsx'
import UserSignin from './Pages/UserPages/UserRegister/UserSignin.jsx'
import UserLogin from './Pages/UserPages/UserRegister/UserLogin.jsx'


const router =createBrowserRouter([
{
  path: '/',
  element: <UserHeader />,
  children:[
    { path:'/',
      element: <Home />
    },
    { path:'contact',
    element: <UserContactPage />
  },
  {
    path:'product',
    element:<UserProductsPage />
  },
  {
    path:'register',
    element:<UserSignin />
  },
  {
    path:'login',
    element:<UserLogin />
  }

  ]
  
},



{
  path:'/about',
  element:<UserAboutPage />
}
,{
  path:'*',
  element:<NoFoundPage />
}

])




createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
