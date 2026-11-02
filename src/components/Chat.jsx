

import { useState } from "react"
import ChatArea from "./Chat_part"
import ChatHeader from "./ChatHeader"
import Sidebar from "./ChatSidebar"



export const Chat = ({name,email}) => {
    const [normalChat,setNormalChat] = useState(false)
    return (
        <div className="min-h-screen bg-slate-50">
           <ChatHeader name={name} email={email}/>
           <div className="flex">
            <Sidebar  normalChat={normalChat} setNormalChat={setNormalChat}/>
            <ChatArea name={name} normalChat={normalChat} />
           </div>
         
           
        </div>
    )
}