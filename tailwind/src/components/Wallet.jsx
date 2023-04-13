import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaGooglePay } from "react-icons/fa";



export const Wallet = ()=>{

return(
    <div className="max-w-[1640px] mx-auto p-4 py-12">
    <div >
      <h1 className="text-5xl bold sm:text-center">
        Wallet
      </h1>
      </div>
{/*         Overlay card */}
      <div className=" rounded-full justify-around flex py-20">
        <div className="text-2xl w-56 text-center bg-slate-200  hover:scale-105 duration-300 rounded-2xl">
        <div >
       <p>Hunger and Beats </p> 
              <h2>₹0.00</h2>
              </div>
        <button className="rounded-full bg-black text-white
        w-32 my-4">+Gift Card</button>
        
        </div>
    <div className="text-2xl rounded-lg w-100 pl-30 bg-slate-200 h-36  hover:scale-105 duration-300">
    <div>
      <h2  >Send a Gift</h2>
      <p className="py-4">Want to send something to someone special</p>
    </div>
      <button className="rounded-full bg-slate-400 w-32 my-4">Send a gift</button>
    </div>
      </div>

<div>
    <div>
        <h1 className="text-2xl bold">Payment methods</h1>
    </div>
    <div className="flex">
        <FaGooglePay size={60}/>
        <h3 className=" align-bottom py-4 pl-5 text-lg bold">Google Pay</h3>
        </div>
        <div className="flex">
        <BsCashCoin size={50}/>
        <h3 className="pl-8 text-lg ">Cash</h3>
    
    
    </div>
    <button className=" rounded-full bg-gray-300 my-4 w-72 hover:scale-105 duration-300">Add Payment Method or Redeem Gift Card</button>
</div>

    </div>

);
}
