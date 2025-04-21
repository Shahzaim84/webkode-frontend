import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { DeveloperDataContext } from '../context/DeveloperContext';

const DeveloperProtectorWrapper = ({children}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { setDeveloper } = useContext(DeveloperDataContext); 
  useEffect(()=>{
    tokenChecker();
  },[token])

  const tokenChecker = async()=>{
    try{
      if(!token){
        localStorage.removeItem("token");
        toast.error("Login First");
        navigate("/login");
        return 
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/token-verify`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(response.status === 200){
        setDeveloper(response.data.UserDetails);
      }
    }catch(error){
      if(error.status === 401){
        toast.error("Login First");
        localStorage.removeItem("token");
        return navigate("/login");
      }else if(error.status === 404){
        toast.error("Login First");
        localStorage.removeItem("token");
        return navigate("/login");
      }else if(error.status === 409){
        toast.error("First Verify Your Email");
        sessionStorage.setItem("token", token);
        return navigate("/otpverification", {state: {Isregister: true}});
      }else if(error.status === 403){
        toast.error("Subcribed First");
        return navigate("/pricing")
      }
        console.log(error);
      }
  }

  return (
    <div>
      {children}
      <Toaster/>
    </div>
  )
}

export default DeveloperProtectorWrapper