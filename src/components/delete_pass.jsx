import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";


const Delete_pass = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    
    
    const [password,setPassword] = useState("");
    

    const submitHandle =async (e) => {
        e.preventDefault();
       
        const newpass  = password.trim();
        
        setPassword(newpass);
        try{
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/delete-account`,{method:"DELETE",
                headers:{"Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({password:newpass})
            })
            const data = await res.json();
            if(res.ok){
                
                localStorage.removeItem("token")
                navigate("/");
                 

            }
        }catch(error){
            console.log("API error ",error)
        }
    }



    return (
        <section className="sing_up">
            <form className="sign_up_content password" onSubmit={submitHandle}>
                
                <label>Password</label>
                 
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <Link to="/forget_password"><span className="text-blue-400">Forget Password</span></Link>

                
                
                <button type="submit">Delete</button> 
                

                


            </form>
        </section>
    )
}

export default Delete_pass;