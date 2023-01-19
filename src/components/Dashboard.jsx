import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import MemoryDetailView from "../pages/MemoryDetailView";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


const Dashboard = () => {
  const user = false;
  return (
    <div className="min-h-screen max-w-screen bg-gray-50">

          {
            !user && 
            <Routes>
            <Route path="/signin" element={ <SignIn /> } />
            <Route path="/signup" element={ <SignUp /> } />
            </Routes> 
          }
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/memory/:id" element={ <MemoryDetailView /> } />
          </Routes>

    </div>
  )
}

export default Dashboard