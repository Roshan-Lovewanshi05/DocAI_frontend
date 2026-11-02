import { useNavigate } from "react-router-dom";
import { Chat } from "./Chat";
import { useEffect, useState } from "react";



function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL
    const [user,setUser] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const checkUser = async() => {
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
            return;
        }
        try{
            const response = await fetch(`${API_URL}/me`,{method:"GET",headers:{
                Authorization:`Bearer ${token}`,
            },});
            if(!response){
                localStorage.removeItem("token");
                navigate("/login")
                return;
            }
            const user = await response.json();
            setUser(user)
            
        }catch(error){
            localStorage.removeItem("token");
            navigate("/login")
            
        }}
        checkUser()
    },[navigate])

    if(!user){
        return <div> Loading Data...</div>
    }

    return <Chat name={user.name} email={user.email}/>

}

export default Dashboard