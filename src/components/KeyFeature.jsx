

import React from 'react'
import { Upload, Bot, Search, FileText } from "lucide-react";
import { Card } from './Card';





export const KeyFeature = () => {
    const data = [
    {
      icon: <Upload size={35} />,
      title: "Upload Documents",
      text: "Easily upload your PDF files and get started in seconds.",
      color: "text-blue bg-blue-200",
    },
    {
      icon: <Bot size={35} />,
      title: "Ask AI",
      text: "Ask questions about your documents and get accurate answers instantly.",
      color: "text-purple bg-purple-200",
    },
    {
      icon: <Search size={35} />,
      title: "Smart Search",
      text: "Find the information you need quickly with AI-powered search.",
      color: "text-green bg-green-200",
    },
    {
      icon: <FileText size={35} />,
      title: "Instant Summary",
      text: "Get clear and concise summaries of your documents in seconds.",
      color: "text-yellow bg-yellow-200",
    },
  ];


  return (
    <section className='key-feature text-center'>
      <span className='key font-bold bg-[#eef6ff] text-[#4f46e5] rounded-[20px] '>Key Feature</span>
      <h1 className='font-bold text-2xl '>Everything You Need in One Place</h1>
      <span className='w-[200px] text-center'>Simple powerful easy to use Our AI assistant helps you get the most out of your document.</span>
      <div className="card flex justify-between">
        {data.map((items,i) => (
           <Card key={i} icon={items.icon} title={items.title} text={items.text} color={items.color}/>
        ))}
      </div>
      

    </section>
  )
}

