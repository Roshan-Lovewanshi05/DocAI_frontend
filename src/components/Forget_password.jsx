import { useState } from "react"
import { MdOutlineErrorOutline } from "react-icons/md";
import {  useNavigate } from "react-router-dom";

const Forget_password = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate();

   
    const [email,setEmail] = useState("");
    
  
    const [validEmail,setValidEmail] = useState(true);
   
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const newEmail = email.trim()
        setEmail(newEmail)
        
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
                       
                        email:newEmail,
                        mood:"forget"
                    }
                 });

            }

        }catch(error){
            console.log("API error ",error)
        }
       
    }
    return (
        <section className="sing_up">
            <form className="sign_up_content" onSubmit={handleSubmit}>
                
                
                <label>Email</label>
                <input type="email" value={email} onChange={(e) =>{ 
                    setEmail(e.target.value)
                    setValidEmail(true)}} placeholder="Enter Your Email"/>
                {!validEmail &&(<div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/> Invalid email</div>)}
                <button type="submit">Sent OTP</button>
                
               
            </form>

        </section>
    )
}
export default Forget_password;