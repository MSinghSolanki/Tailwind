import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaGooglePay } from "react-icons/fa";

export const Wallet = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 py-12">
      <div>
        <h1 className="text-5xl font-bold text-center">Wallet</h1>
      </div>

      {/* Overlay card */}
      <div className="flex justify-around py-20">
        <div className="w-56 bg-white rounded-2xl text-center hover:scale-105 duration-300 transform transition">
          <div>
            <p className="text-gray-500">Hunger and Beats</p>
            <h2 className="text-3xl font-bold">₹0.00</h2>
          </div>
          <button className="w-full py-2 mt-4 text-white bg-black rounded-full hover:bg-gray-700 transition duration-300">
            + Gift Card
          </button>
        </div>

        <div className="w-56 bg-slate-200 rounded-lg text-center hover:scale-105 duration-300 transform transition">
          <div>
            <h2 className="text-xl font-bold">Send a Gift</h2>
            <p className="py-4 text-gray-600">Want to send something to someone special?</p>
          </div>
          <button className="w-full py-2 text-white bg-slate-400 rounded-full hover:bg-slate-500 transition duration-300">
            Send a gift
          </button>
        </div>
      </div>

      <div>
        <div>
          <h1 className="text-2xl font-bold">Payment methods</h1>
        </div>
        <div className="flex items-center hover:bg-gray-100 w-52 rounded-2xl p-4">
          <FaGooglePay size={60} className="text-blue-500" />
          <h3 className="pl-5 text-lg font-bold">Google Pay</h3>
        </div>
        <div className="flex items-center hover:bg-gray-100 w-52 rounded-2xl p-4">
          <BsCashCoin size={40} className="text-yellow-500" />
          <h3 className="pl-5 text-lg">Cash</h3>
        </div>
        <button className="w-72 py-2 my-4 rounded-full bg-gray-300 hover:bg-gray-400 transition duration-300">
          Add Payment Method or Redeem Gift Card
        </button>
      </div>
    </div>
  );
}
