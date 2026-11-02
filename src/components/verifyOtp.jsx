import { useState } from "react"
import {  useLocation, useNavigate } from "react-router-dom"
import { MdOutlineErrorOutline } from "react-icons/md";
export const VerifyOtp = () =>{
    const API_URL = import.meta.env.VITE_API_URL

    const location = useLocation();
    const {username,email,mood} = location.state || {};

    const navigate = useNavigate();

    const [otp,setOtp] = useState(["","","","",""])
     const [message,setMessage] = useState("")

      const handleOto = (value,index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    }


     const submitHandle = async (e) => {
            e.preventDefault()
            const finalOtp = otp.join("")
    
            try{
                const res = await fetch(`${API_URL}/verifyOtp`,{method:"post",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({email:email,otp:finalOtp})
                })
                const data = await res.json();
                if(data.status){
                     navigate("/sing-up/verify-otp/set-password",{
                    state:{
                        username:username,
                        email:email,
                        mood:mood
                        
                    }
                 })
                

            }else{
                setMessage("Wrong OTP")

            }

               
            }catch(error){
                console.log("API error ",error)
            }
            
    
        }
    

   
    return (
        <section className="sing_up">
            <form className="sign_up_content" onSubmit={submitHandle} >
                <label>Enter OTP</label>
                <div className="otp-boxes">
                    {otp.map((digit,index) => (
                        <input key={index} maxLength="1" value={digit} onChange={(e) => handleOto(e.target.value, index)}/>
                    ))}
                </div>
                <button type="submit" >Verify</button>
                {message &&(<div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/>{message}</div>)}

            </form>

        </section>
    )
}
