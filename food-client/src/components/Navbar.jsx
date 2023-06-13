import React, { useContext, useEffect } from "react";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { useState } from 'react';
import logo1 from "./images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationForm } from "./register";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Navbar = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [close, setClose] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("name") && localStorage.getItem("email")) {
      setName(localStorage.getItem("name"));
      setEmail(localStorage.getItem("email"));
      setShowPopup(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      setClose(false);
    };
  }, [navigate]);

  const startScroll = () => {
    setClose(false);
  };

  const stopScroll = () => {
    setClose(true);
  };

  window.onbeforeunload = function (e) {
    localStorage.clear();
  };

  const handleNavigation = (event) => {
    if (!name || !email) {
      event.preventDefault(); // Stop navigation
      toast.error("Please register yourself."); // Redirect to the desired page
    } 
  };
  return (
    <div>
    <ToastContainer></ToastContainer>
    <div className='flex max-w-[1980px] mx-auto justify-between items-center p-4 shadow-2xl sticky inset-0 z-10 bg-white'>
   
      <div className='flex items-center'>
        <div onClick={stopScroll} className='cursor-pointer'>
          <FaAlignLeft className='text-4xl' />
        </div>
        <Link to="/">
          <img className='w-16 sm:w-20' src={logo1} alt="Logo" />
        </Link>
        <div className='hidden sm:flex items-center bg-gray-200 rounded-full p-1 text-sm'>
          <p className='text-black hover:bg-black hover:text-white rounded-full'>Delivery</p>
          <p className="ml-1 text-black hover:bg-black rounded-full hover:text-white">Pickup</p>
        </div>
      </div>
      <div>
        <h1 className=" lg:text-4xl font-bold sm:text-xl xl:4xl md:4xl">
          Quality and <span className="text-orange-500 font-bold">Quantity</span>
        </h1>
        {name && email ? (
          <div>
            <p className="text-black mr-4">Name - {name}</p>
            <p className="text-black">Email - {email}</p>
          </div>
        ) : (
          <div>
            {showPopup && (
              <RegistrationForm
                onSuccess={(name, email) => {
                  setName(name);
                  setEmail(email);
                  localStorage.setItem("name", name);
                  localStorage.setItem("email", email);
                  setShowPopup(false);
                }}
              />
            )}
          </div>
        )}
      </div>
      {close ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ""}
      <div className={close ? 'fixed top-0 left-0 w-[300px] bg-white h-screen z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] bg-white h-screen z-10 duration-300'}>
        <AiOutlineClose onClick={startScroll} size={30} className='absolute right-4' cursor-pointer />
        <img className='w-64 sm:w-25' src={logo1} alt="Logo" />
        <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
            <li className='flex text-lg p-4 cursor-pointer'>
              <TbTruckDelivery size={25} className="mr-4" />
              <Link to="/orders" onClick={handleNavigation}>Orders</Link>
            </li>
            <li className='flex text-lg p-4 cursor-pointer'>
              <MdFavorite size={25} className="mr-4" />
              <Link to="/favourite" onClick={handleNavigation}>Favorites</Link>
            </li>
            <li className='flex text-lg p-4 cursor-pointer'>
              <FaWallet size={25} className="mr-4" />
              <Link to="/wallet" onClick={handleNavigation}>Wallet</Link>
            </li>
            <li className='flex text-lg p-4 cursor-pointer'>
              <FaUserFriends size={25} className="mr-4" />
              <Link to="/invite" onClick={handleNavigation}>Invite Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
  );
};
