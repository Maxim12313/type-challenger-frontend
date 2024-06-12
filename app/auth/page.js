'use client'

import InputForm from "./InputForm";
import { useState } from "react";

export default function Page() {
  const [method, setMethod] = useState('login');

  return (
    <div className="w-full h-full flex flex-row justify-center items-center helper">
      <div className='flex flex-col p-5'>
        <div className="w-full flex flex-row justify-center font-bold text-2xl pb-2 space-x-5">
          <button onClick={()=>{setMethod('login')}}>login</button>
          <p> | </p>
          <button onClick={()=>{setMethod('signup')}}>signup</button>
        </div>
        <InputForm method={method}/>
      </div>
    </div>
  )
}