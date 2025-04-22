import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AdminDataContext } from '../context/AdminContext';

const AdminProtectorWrapper = ({children}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { setAdmin } = useContext(AdminDataContext); 
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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/token-verify`,
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
      }else if(error.status === 409 && error?.response?.data?.message === "UnAuthorized Access"){
        return navigate("/");
      }else if(error.status === 409){
        toast.error("First Verify Your Email");
        sessionStorage.setItem("token", token);
        return navigate("/otpverification", {state: {Isregister: true}});
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

export default AdminProtectorWrapper