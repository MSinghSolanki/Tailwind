import React from "react";

export const PaymentGateway = ()=>{

    return(
        <div className="bg-gray-200 text-2xl max-w-xl ">
          <div className="flex">
            <div>
                <h2>Email</h2>
                <input type="email" placeholder="Enter Email"/>
            </div>
            <div className="pl-4">
                <h2>Password</h2>
                <input type="password"/>
            </div>
          </div>
          <div>
            <h1>Address</h1>
            <input type="text" placeholder="Enter Your Address"/>
          </div>
          <div>
            <h1>PinCode</h1>
            <input type="Number" placeholder="Enter PinCode"/>
          </div>
          <div>
            <h1>City</h1>
            <input type="text" placeholder="Enter City"/>
          </div>
<div>
    <h1>State</h1>
    <div>
        <select>
            <option>Choose</option>
            <option>...</option>
        </select>
    </div>
</div>
<button className="bg-blue-300 rounded-full w-32">Sign In</button>
        </div>
    )
}