import React, { Fragment, useState } from "react";
import { Address } from "./address";

export const PaymentGateway = ()=>{

  const [modal,showModal] = useState(false);

    return(
<Fragment>
      <div className="">
        <button className=" bg-yellow-300 rounded-3xl w-52 h-11" onClick={()=>showModal(true)}>Add a Address</button>
      </div>
      <Address invisible={modal} onClose={()=>{
        showModal(false)
      }}>
 <div className=" rounded-xl text-2xl max-w-xl shadow-2xl my-48 border-gray-500 bg-white">
          <div className="flex">
            <div>
                <h2  >Email</h2>
                <input className=" border-2 border-black" type="email" placeholder="Enter Email"/>
            </div>
          </div>
          <div>
            <h1>Address</h1>
            <input  className=" border-2 border-black" type="text" placeholder="Enter Your Address"/>
          </div>
          <div>
            <h1>PinCode</h1>
            <input  className=" border-2 border-black" type="Number" placeholder="Enter PinCode"/>
          </div>
          <div>
            <h1>City</h1>
            <input  className=" border-2 border-black" type="text" placeholder="Enter City"/>
          </div>
<div>
    <h1>State</h1>
    <div>
        <select  className=" border-2 border-black">
            <option>Choose</option>
            <option>...</option>
        </select>
    </div>
</div>
<button className="bg-blue-300 rounded-full w-32 my-4">Sign In</button>
        </div>


        </Address>
      </Fragment>

       
    )
}