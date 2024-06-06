'use client'

import { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function InputForm({method}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

  }

  const handleSignUp = (e) => {
    e.preventDefault();

  }

  const ForgotPassword = () => {
    if (method == 'login') {
      return (
        <button className="w-full text-right pt-2"> Forgot Password? </button>
      )
    }
  }

  return (
    <div className="py-5">
      <form className="" onSubmit={(e)=>{method == "login" ? handleLogin(e) : handleSignUp(e)}}>
        <div className="formLabel"> Email </div>
        <div className="flex flex-row items-center justify-center formInput">
          <FaEnvelope size={20}/>
          <input className="ml-2"value={email} type='text' placeholder="Your Email" 
            onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>

        <div className="formLabel"> Password </div>
        <div className="flex flex-row items-center justify-center formInput">
          <FaLock size={20}/>
          <input className="ml-2" value={password} type='password' placeholder="Your Password" 
            onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>

        <ForgotPassword/>

        <input className="w-full text-center mt-5 border-2 text-xl hover:bg-gray-200" 
          value={method === "login" ? "LOGIN" : "SIGNUP"} type="submit"/>
      </form>
    </div>
  )

}