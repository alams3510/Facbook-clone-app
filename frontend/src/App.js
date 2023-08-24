import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {user} =useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user?<Home />:<Navigate to='/register'/>} />
          <Route path="/login" element={user? <Navigate to='/'/>: <Login />} />
          <Route path="/register" element={user? <Navigate to='/'/>:<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
