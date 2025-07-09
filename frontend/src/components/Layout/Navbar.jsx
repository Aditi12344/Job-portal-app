import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="navbarShow">
      <div className="left">
        <h2>
          <Link to="/">JobZee</Link>
        </h2>
      </div>

      <div className={`right ${show ? "show" : ""}`}>
        {isAuthorized ? (
          <>
            <Link to="/job/getall">All Jobs</Link>
            <Link to="/job/post">Post Job</Link>
            <Link to="/job/me">My Jobs</Link>
            <Link to="/applications/me">My Applications</Link>
            <span>Welcome, {user?.name || "User"}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      <div className="hamburger" onClick={() => setShow(!show)}>
        {show ? <AiOutlineClose size={20} /> : <GiHamburgerMenu size={20} />}
      </div>
    </nav>
  );
};

export default Navbar;

      
