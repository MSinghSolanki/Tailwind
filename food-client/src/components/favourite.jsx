import axios from "axios";
import React, { useState,useEffect } from "react";

export const Favourite= ()=>{
    
const[orders,setOrders] =useState([])


const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:2754/favourite/fav");
    const data = response.data;
    setOrders(data.favourites);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchOrders();
}, []);

return(
    <div>
<div>
    <h1 className=" text-5xl text-red-500 text-center font-extrabold">Your Fav List</h1>
</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              name="image"
              src={order.image}
              alt={order.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
        
            <div className="flex justify-between px-2 py-4">
              <p name="name" className="font-bold">
                {order.name}
              </p>

              <span name="price" className="bg-orange-500 text-white p-1 rounded-full">
                {order.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    


)
}