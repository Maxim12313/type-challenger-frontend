'use client'

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { doSignUp, doLogin, doSignWithGoogle } from './authFunc';

export default function InputForm({method}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({success: false, message: ''});


  const handleLogin = (e) => {
    e.preventDefault();

    doLogin(email, password)
    .then((user) => {
      console.log("login successful", user);
      

    })
    .catch((error) => {
      console.log("login unsuccessful", error);
    })
    
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus({
        success: false,
        message: "Passwords does not match"
      })
      return;
    }

    doSignUp(email, password)
    .then((user) => {
      console.log("sign up successful", user);
      setStatus({
        success: true,
        message: "Account created successfully"
      });
    })

    .catch((error) => {
      console.log("sign up failed", error);
      setStatus({
        success: false,
        message: error.code
      });
    })
  }

  const handleSignWithGoogle = (e) => {
    e.preventDefault();
    doSignWithGoogle();
  }

  const ConfirmPassword = () => {
    if (method == 'signup') {
      return (
        <div className="flex flex-row items-center justify-center formInput">
          <GiConfirmed size={20}/>
          <input className="ml-2" value={confirmPassword} type='password' placeholder="Your Password" 
            onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        </div>
      )
    }
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
        
        <ConfirmPassword/>

        <ForgotPassword/>

        <input className="w-full h-8 text-center mt-5 border-2 text-xl hover:bg-gray-200" 
          value={method === "login" ? "LOGIN" : "SIGNUP"} type="submit"/>

        <div className="w-full text-center pt-2" style={{color: status.success ? 'green' : 'red'}}> {status.message} </div>

        <p className="w-full text-center text-xl mt-20"> {method == "login" ? "Or Login With" : "Or Sign In With"} </p>
        <button onClick={(e)=>{handleSignWithGoogle(e)}} className="w-full h-8 flex flex-row items-center place-content-center border-2 text-xl hover:bg-gray-200"> 
          <FcGoogle/> OOGLE 
        </button>
        

        
      </form>
    </div>
  )

}