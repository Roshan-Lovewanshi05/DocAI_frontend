
import { Outlet } from "react-router-dom"
import Create_pass from "./components/creatPassword"
import Header from "./components/header"
import Hero from "./components/hero"
import { KeyFeature } from "./components/KeyFeature"
import Login from "./components/login"
import Sign_up from "./components/signup"
import { VerifyOtp } from "./components/verifyOtp"

function App() {
  

  return (
    <>
     <Header/>
     <Outlet/>
     <KeyFeature/>
     
   
    </>
  )
}

export default App
