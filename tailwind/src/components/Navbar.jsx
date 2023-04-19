import React, { useEffect } from "react";
import {FaUserFriends, FaWallet} from "react-icons/fa";
import {FaAlignLeft} from  "react-icons/fa";
import {FaSistrix} from "react-icons/fa"
import {BsFillCartFill, BsFillSaveFill} from "react-icons/bs"
import {AiOutlineClose} from "react-icons/ai"
import {TbTruckDelivery} from "react-icons/tb"
import {MdHelp,MdFavorite} from "react-icons/md"
import { useState } from 'react';
import logo1 from "./images/logo.png"
import axios from "axios";

export const Navbar=()=>{

const[count,setCount] =useState([])



 const counts = ()=>{
  axios.get("http://localhost:8080/orders").then((res)=>{
setCount(res.data.length)

  })

}
useEffect(()=>{
counts();

},[])


    const [close,setClose] =useState(false)

    const startScoll=()=>{
      setClose(false);

      document.body.style.overflow='unset';
    }
    const stopscroll=()=>{
      setClose(!close);

      if(typeof window !='undefined' &&window.document){
        document.body.style.overflow='hidden';
      }
    }


  return (
    <div className='flex max-w-[1980px] mx-auto justify-between 
    items-center p-4 '>
      <div className='flex items-center'>
        <div onClick={stopscroll}
        className='cursor-pointer'>
    <FaAlignLeft className='text-4xl'/>
      </div>
  <img className='w-20' src={logo1}/>
   <div className='flex lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]
   '>
    <p  className='text-black hover:bg-black hover:text-white rounded-full'> Delivery</p>
    <p className="ml-1 text-black hover:bg-black rounded-full hover:text-white">Pickup</p>
   </div>
   {/* Search Menu */}
   </div>
   <div className='bg-gray-200 rounded-full items-center px-2 w-[200px]
   sm:w-[400px] lg:w-[500px] flex hover:scale-105 duration-300'>
    <FaSistrix size={20}/>
    <input className='bg-transparent p-2 focus:outline-none' type='text' placeholder='Search Food'/>
   </div>
   {/* {Cart button} */}
   <button className='bg-transparent hidden md:flex items-center py-2
   rounded-full w-20 hover:scale-105 duration-300 flex pr-4'>

    <BsFillCartFill size={20} className='ml-4'/><span className="mb-5 rounded-full bg-red">{count}</span>
   </button>

   {/* Mobile Menu */}
   {/* Overlay */}
   {close? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'>
   </div> :"" }
  
   {/* Side Bar */}
   <div className={close?'fixed top-0 left-0 w-[300px] bg-white h-screen z-10 duration-300':'fixed top-0 left-[-100%] w-[300px] bg-white h-screen z-10 duration-300'}>


{/* Close menu */}
<AiOutlineClose onClick={startScoll}
 size={30} className='absolute right-4' cursor-pointer/>
<img className='w-25' src={logo1}/>
<nav>
  <ul className='flex flex-col p-4 text-gray-800'>
    <li className='flex text-xl p-4 cursor-pointer'><TbTruckDelivery size={25} className="mr-4 "/>Orders</li>
    <li className='flex text-xl p-4 cursor-pointer'><MdFavorite size={25} className="mr-4"/>Favourites</li>
    <li className='flex text-xl p-4 cursor-pointer'><FaWallet size={25} className="mr-4"/>Wallets</li>
    <li className='flex text-xl p-4 cursor-pointer'><MdHelp size={25} className="mr-4"/>Promotions</li>
    <li className='flex text-xl p-4 cursor-pointer'><BsFillSaveFill size={25} className="mr-4"/>Best Ones</li>
    <li className='flex text-xl p-4 cursor-pointer'><FaUserFriends size={25} className="mr-4"/>Invite Friends</li>
  </ul>
</nav>
   </div>
    </div>

  )


}