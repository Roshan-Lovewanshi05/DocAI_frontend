import { useState } from "react"
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Sign_up = () => {

    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    
    const [validUsername,setValidUsername] = useState(true);
    const [validEmail,setValidEmail] = useState(true);
    const [message,setMessage] = useState("")
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newUsername = username.trim()
        const newEmail = email.trim()
        setEmail(newEmail)
        setUsername(newUsername)
        if (!/[A-Za-z]/.test(newUsername)){
           setValidUsername(false)
           
           return;
        } 
        if(!/[A-Za-z]/.test(newEmail) || !newEmail.endsWith("@gmail.com") || newEmail.includes(" ") ){
            setValidEmail(false)
           
            
            return;
        }

        try{
            const res = await fetch(`${API_URL}/otp`,{method:"post",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email:newEmail})
            })
            const data = await res.json();
            if(data.status){
                 navigate("/sing-up/verify-otp",{
                    state:{
                        username:newUsername,
                        email:newEmail,
                        mood:"signup"
                    }
                 });

            }else{
                setMessage("You already register")

            }

        }catch(error){
            console.log("API error ",error)
        }
       
    }
    return (
        <section className="sing_up">
            <form className="sign_up_content" onSubmit={handleSubmit}>
                <h1 className="title_text">Create Your Account</h1>
                <p className="text_start">Sign up to start using DocAI</p>
                <label>Name</label>
                <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)
                    setValidUsername(true)
                 }} placeholder="Enter your Name"></input>
                {(!validUsername && <div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/> Invalid username</div>)}
                
                <label>Email</label>
                <input type="email" value={email} onChange={(e) =>{ 
                    setEmail(e.target.value)
                    setValidEmail(true)}} placeholder="Enter Your Email"/>
                {!validEmail &&(<div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/> Invalid email</div>)}
                <button type="submit">Sent OTP</button>
                {message &&(<div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/> {message}</div>)}
               
            </form>

        </section>
    )
}
export default Sign_up;