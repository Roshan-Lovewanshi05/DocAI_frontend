import React from 'react'

export const Card = ({icon,title,text,color}) => {

  
 
  return (
    <div className='Card-feature'>
      <div className={`icon w-[50px] h-[50px] flex items-center justify-center  rounded-[50%] ${color}`}>{icon}</div>
      <div className='title font-bold'>{title}</div>
      <p>{text}</p>
      

    </div>
  )
}
