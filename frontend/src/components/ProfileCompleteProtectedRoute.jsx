import React from 'react'
import {Navigate} from "react-router-dom"

const ProfileCompleteProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if(user.is_profile_complete) {
        return <Navigate to="/dashboard" replace />
    }
    
    return children

};

export default ProfileCompleteProtectedRoute;
