import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";

const Create_pass = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const location = useLocation();
    const {username,email,mood} = location.state || {};
    const navigate = useNavigate();

    const [psw,setPsw] = useState("");
    const [repsw,setRespsw] = useState("");

    const [message,setMessage] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newpsw = psw.trim();
        const newrepsw = repsw.trim();
        setPsw(newpsw);
        setRespsw(newrepsw);

        if(newpsw !== newrepsw){
            setMessage("Check Password");
            return;
        }


        if (newpsw===newrepsw){


          try{
            if (mood==="signup"){
            const res = await fetch(`${API_URL}/setpassword`,{method:"post",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email:email,username:username,password:psw})
            })
             const data = await res.json();
            if(data.status){
                 navigate("/");
                 console.log(data)

            }else{
                setMessage(data.message)

            }

        }else{
                 const res = await fetch(`${API_URL}/reset_password`,{method:"put",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email:email,password:psw})
            })
             const data = await res.json();
            if(data.status){
                 navigate("/");
                 console.log(data)

            }else{
                setMessage(data.message)

            }


            }
           
        }catch(error){
            console.log("API error ",error)
        }}else{
             setMessage("Check Passwords");

        }
    }






    return (
         <section className="sing_up">
            <form className="sign_up_content password" onSubmit={handleSubmit}>
                <h1 className="title_text">Set Your Password</h1>
                <p className="text_start">Create a secure password for your account</p>
                <label>Password</label>
                
                <input type="password" placeholder="Enter your password" value={psw} onChange={(e) => {setPsw(e.target.value)}}></input>
                
                <label>Re-enter Password</label>
                 
                <input type="password" placeholder="Re-enter Your password" value={repsw} onChange={(e) => {setRespsw(e.target.value)}}/>
                
                
                <button type="submit">Confirm</button>
                 {message &&(<div className="text-red-500 flex items-center gap-0.5"><MdOutlineErrorOutline/>{message}</div>)}

            </form>
        </section>
    )
}
export default Create_pass;