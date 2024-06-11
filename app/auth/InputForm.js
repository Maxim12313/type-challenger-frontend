'use client'

import { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";


export default function InputForm({method}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({success: false, message: ''});

  const getResponse = async () => {
    const development = "http://localhost:8080";
    const production = "https://type-challenger-backend-o2gxniz4ia-ue.a.run.app";
    const url = (process.env.NODE_ENV == "development" ? development : production) + "/" + method;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email:email, password:password }),
    });
    const data = await res.json();
    return data;
  };

  const handleLogin = (e) => {
    e.preventDefault();
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setStatus({
        success: false,
        message: "Passwords does not match"
      })
      return;
    }
    const res = await getResponse();
    console.log(res);
    res.success ? handleSuccess(res.state) : handleFail(res.state);
  }

  const handleSuccess = (user) => {
      console.log("sign up successful", user);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setStatus({
        success: true,
        message: "Account created successfully"
      });
  }

  const handleFail = (error) => {
      console.log("sign up failed", error.code);
      setStatus({
        success: false,
        message: error.code
      });
  }

  return (
    <div className="py-5">
      <form className="" onSubmit={(e)=>{method == "login" ? handleLogin(e) : handleSignUp(e)}}>
        <div className="formLabel"> Email </div>
        <div className="flex flex-row items-center justify-center formInput">
          <FaEnvelope size={18}/>
          <input className="ml-2"value={email} type='text' placeholder="Your Email" 
            onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>

        <div className="formLabel"> Password </div>
        <div className="flex flex-row items-center justify-center formInput">
          <FaLock size={18}/>
          <input className="ml-2" value={password} type='password' placeholder="Your Password" 
            onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        
        {method == 'signup' && 
          <div className="flex flex-row items-center justify-center formInput">
            <GiConfirmed size={18}/>
            <input className="ml-2" value={confirmPassword} type='password' placeholder="Confirm Password" 
              onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
          </div>
        }

        {method == 'login' && 
          <button className="w-full text-right pt-2"> Forgot Password? </button>
        }

        <input className="w-full text-center mt-5 border-2 text-xl hover:bg-gray-200" 
          value={method === "login" ? "LOGIN" : "SIGNUP"} type="submit"/>

        <div className="w-full text-center pt-2" style={{color: status.success ? 'green' : 'red'}}> {status.message} </div>

        <p className="w-full text-center text-xl mt-10"> Or Sign In With </p>
      </form>

      <div className="flex flex-row place-content-center">
        <GoogleSignInButton/>
      </div>
    </div>
  )
}