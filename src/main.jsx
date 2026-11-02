import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './components/hero.jsx'
import Sign_up from './components/signup.jsx'
import { VerifyOtp } from './components/verifyOtp.jsx'
import Create_pass from './components/creatPassword.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Delete_pass from './components/delete_pass.jsx'
import Forget_password from './components/Forget_password.jsx'


const router = createBrowserRouter([
  
  {path: "/",element:<App/>,children:[
    {path:"/",element:<Hero/>},
    {path:"/sign-up",element:<Sign_up/>},
    {path:"/sing-up/verify-otp",element:<VerifyOtp/>},
    {path:"/sing-up/verify-otp/set-password",element:<Create_pass/>},
    {path:"/login",element:<Login/>},
    {path:"/delete-account",element:<Delete_pass/>},
    {path:"/forget_password",element:<Forget_password/>}
  ]},
  {path:"/chat",element:<Dashboard/>
    
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>

    
    
  </StrictMode>,
)
