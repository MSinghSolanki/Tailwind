import React from "react";
import {FaUserFriends, FaWallet} from "react-icons/fa";
import {FaAlignLeft} from  "react-icons/fa";
import {FaSistrix} from "react-icons/fa"
import {BsFillCartFill, BsFillSaveFill} from "react-icons/bs"
import {AiOutlineClose} from "react-icons/ai"
import {TbTruckDelivery} from "react-icons/tb"
import {MdHelp,MdFavorite} from "react-icons/md"
import { useState } from 'react';


export const Navbar=()=>{

    const [close,setClose] =useState(false)


  return (
    <div className='flex max-w-[1640px] mx-auto justify-between 
    items-center p-4 '>
      <div className='flex items-center'>
        <div onClick={()=>setClose(!close)}
        className='cursor-pointer'>
    <FaAlignLeft className='text-4xl'/>
      </div>
  <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>Uber Beats</h1>
   <div className='flex lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]
   '>
    <p  className='bg-black text-white rounded-full'> Delivery</p>
    <p>Pickup</p>
   </div>
   {/* Search Menu */}
   </div>
   <div className='bg-gray-200 rounded-full items-center px-2 w-[200px]
   sm:w-[400px] lg:w-[500px] flex'>
    <FaSistrix size={20}/>
    <input className='bg-transparent p-2 focus:outline-none' type='text' placeholder='Search Food'/>
   </div>
   {/* {Cart button} */}
   <button className='bg-black text-white hidden md:flex items-center py-2
   rounded-full'>
    <BsFillCartFill size={20} className='mr-2'/>Cart
   </button>

   {/* Mobile Menu */}
   {/* Overlay */}
   {close? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'>
   </div> :"" }
  
   {/* Side Bar */}
   <div className={close?'fixed top-0 left-0 w-[300px] bg-white h-screen z-10 duration-300':'fixed top-0 left-[-100%] w-[300px] bg-white h-screen z-10 duration-300'}>


{/* Close menu */}
<AiOutlineClose onClick={()=>setClose(!close)}
 size={30} className='absolute right-4' cursor-pointer/>
<h2 className='text-2xl p-4'>Uber Beats</h2>
<nav>
  <ul className='flex flex-col p-4 text-gray-800'>
    <li className='flex text-xl p-4'><TbTruckDelivery size={25} className="mr-4"/>Orders</li>
    <li className='flex text-xl p-4'><MdFavorite size={25} className="mr-4"/>Favourites</li>
    <li className='flex text-xl p-4'><FaWallet size={25} className="mr-4"/>Wallets</li>
    <li className='flex text-xl p-4'><MdHelp size={25} className="mr-4"/>Promotions</li>
    <li className='flex text-xl p-4'><BsFillSaveFill size={25} className="mr-4"/>Best Ones</li>
    <li className='flex text-xl p-4'><FaUserFriends size={25} className="mr-4"/>Invite Friends</li>
  </ul>
</nav>
   </div>
    </div>

  )


}