import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import StoryPage from "../../Components/Demo/Demo";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { getUserProfileAction } from "../../Redux/User/Action";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import ReelViewer from "../ReelViewer/ReelViewer";
import ProtectedRoute from "../../Components/Register/ProtectedRoute"

const Routers = () => {
  const location =useLocation();
  const reqUser = useSelector(store=>store.user.reqUser);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUserProfileAction(token));
 },[token])
  return (
    <div>
      
{(location.pathname !== "/login" && location.pathname !=="/signup")&& (
    <div className="flex">
      {location.pathname!=="/reels" && <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/p/:postId" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/p/:postId/edit" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/demo" element={<ProtectedRoute><StoryPage /></ProtectedRoute>} />
              <Route path="/story/:userId" element={<ProtectedRoute><Story /></ProtectedRoute>} />
              <Route path="/account/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
              <Route path="/reels" element={<ProtectedRoute><ReelViewer /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )}
  {(location.pathname === "/login" || location.pathname==="/signup") && (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
