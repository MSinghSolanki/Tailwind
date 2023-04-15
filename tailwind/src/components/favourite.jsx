import React from "react";
import axios from "axios";
import { useState } from "react";
export const Favourite= ()=>{
    
const [favs,setFavs] =useState([])

const Favour =  axios.get("http://localhost:8080/favourite").then((data)=>{
    setFavs(data.data)
})

return(
    <div>
        <h1 className="text-5xl text-center text-red-500">Favourites</h1>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4" >
    {favs.map((e, ei) => (
      <div
        key={ei}
        className="boder shadow-lg rounded-lg hover:scale-105 duration-300"
      >
        <img
          src={e.image}
          alt={e.name}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="flex justify-between px-2 py-4">
          <p className="font-bold">{e.name}</p>
         
          <span className="bg-orange-500 text-white p-1 rounded-full">
            {e.price}
          </span>
          
        </div>
      </div>
    ))}
    </div>
    </div>

    )
}