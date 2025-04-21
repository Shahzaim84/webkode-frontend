import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import OTPVerification from './pages/Auth/OtpVerification'
import ChangePassword from './pages/Auth/ChangePassword'
import Home from './pages/Default/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/otpverification" element={<OTPVerification/>}/>
        <Route path="/changepassword" element={<ChangePassword/>}/>
      </Routes>
    </div>
  )
}

export default App
