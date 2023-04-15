import React from "react";
import axios from "axios";
import { useState } from "react";

export const Orders=()=>{
    const [ors,setOrs] =useState([])

    const Orders =  axios.get("http://localhost:8080/orders").then((data)=>{
        setOrs(data.data)
    })
return(

    <div>
      <div className="flex justify-around sm:my-10 sm:max-w-5xl xl:my-4 xl:max-w-6xl xl:mt-40">
<div>
    <h1 className="text-4xl font-bold">Your Shopping Cart</h1>
</div>
<div>
  <h1 className=" text-red-500 my-3">Continue Shopping</h1>
</div>
</div>
<div className=" pt-28">
  <div className=" flex flex-wrap -ml-16 -mr-16">
        {ors.map((e, ei) => (
          <div
            key={ei}
            className="flex max-w-md max-h-52" >
            <img
              src={e.image}
              alt={e.name}
              className="w-32 h-32 object-cover rounded-t-lg"/>
              <div>
              <p className="font-bold pl-4 pt-14 text-3xl">{e.name}</p>
             </div>
              <div>
              <p>${e.price}</p>
                </div>

                </div>    
        ))}
        </div>
      </div>
      <button className=" bg-yellow-300 w-36 rounded-3xl mt-28 text-3xl">Checkout</button>
    </div>
)




}