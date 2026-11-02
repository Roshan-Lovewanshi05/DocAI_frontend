import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import {MdOutlineErrorOutline} from "react-icons/md";

const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("")

    const submitHandle =async (e) => {
        e.preventDefault();
        const newemail = email.trim();
        const newpass  = password.trim();
        setEmail(newemail);
        setPassword(newpass);
        try{
            const res = await fetch(`${API_URL}/login`,{method:"post",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email:newemail,password:newpass})
            })
            const data = await res.json();
            if(data.status){
                
                localStorage.setItem("token",data.message)
                navigate("/chat");
                 

            }else{
                setMessage(data.message)

            }

        }catch(error){
            console.log("API error ",error)
        }
    }



    return (
        <section className="sing_up">
            <form className="sign_up_content password" onSubmit={submitHandle}>
                <h1 className="title_text">Login</h1>
                <p className="text_start">Welcome back please login to your account.</p>
                <label>Email</label>
                
                <input type="text" placeholder="Enter Email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                
                <label>Password</label>
                 
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                
                
                <button type="submit">Login</button>
                
                {message &&(<div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/>{message}</div>)}
                <Link to="/forget_password"><span className="text-blue-400">Forget Password</span></Link>

                <p className="no-account">Dont have an account?<Link to="/sign-up"><span>Sign Up</span></Link></p>
               


            </form>
        </section>
    )
}

export default Login;