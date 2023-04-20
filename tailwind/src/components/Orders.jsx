import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { PaymentGateway } from "./paymentgateway";
import { Fragment } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Orders=()=>{
    const [ors,setOrs] =useState([])
    const[totalprice,setTotalPrice] = useState(0)


    const loadScript =(src)=>{
      return new Promise((resolve)=>{
       const script =document.createElement('script')
       script.src=src
     
       script.onload = ()=>{
         resolve(true)
       }
     
       script.onerror =()=>{
         resolve(false)
       }
     
       document.body.appendChild(script)
      })
       }
     
     const displayRazorpay =async(price)=>{
       const res =await loadScript('https://checkout.razorpay.com/v1/checkout.js')
     
       if(!res){
         alert("Your Payment failed")
         return
       }

       const options ={
        key: "rzp_test_8q6zwwQwJ27tKx",
        currency:"INR",
        totalprice: totalprice*100,
        name:"Hungry and Beat",
        description:"May your Hunger be Filled",
        image:"./images/logo.png",

       handler:function(response){
        alert(response.razorpay_payment_id)
        alert("payment Succesfully")
       },
       prefill:{
        name:"Hunger and Beat"
       }
       };
       const paymentObject = new window.Razorpay(options)
       paymentObject.open()
     }



    const Orders =()=>{  axios.get("http://localhost:8080/orders").then((res)=>{
        setOrs(res.data)
        let total=0;
        res.data.map((e)=>{
          total=total+e.price;
        });
        setTotalPrice(total);
       
    });
    };
useEffect(()=>{
    Orders();
},[])

return(
    <div>
      <PaymentGateway/>
    
    <div>
      

      <div className="flex justify-around sm:my-10 sm:max-w-5xl xl:my-4 xl:max-w-6xl xl:mt-40">
<div>
    <h1 className="text-4xl font-bold">Your Shopping Cart</h1>
</div>
<div>
  <h1 className=" text-red-500 my-3">
    <Link to="/">Continue Shopping</Link></h1>
</div>
</div>
<div className=" pt-28 flex justify-around">
  <div className="">
        {ors.map((e, ei) => (
          <div
            key={ei}
            className="flex max-w-md max-h-52 shadow-2xl bg-slate-100" >
            <img
              src={e.image}
              alt={e.name}
              className="w-32 h-32 object-cover rounded-t-lg"/>
            <div className="flex">
              <div>
              <p className="font-bold pl-4 pt-14 text-3xl">{e.name}</p>
             </div>
              <div className=" flex flex-col-reverse">
              <p className=" ml-10">{e.price}</p>
                </div>
                </div>
                <div>
                
            </div>

                </div>    
        
        ))}
        </div>
        <div>
        <div >
        <h1 className="text-5xl font-bold ">Order Summary</h1>
        </div>
        <div className=" bg-gray-100 mt-24 shadow-2xl rounded-2xl h-40">
            <h1 className=" h-10 font-bold text-2xl">Product Total:{totalprice}</h1>
        <div>
        <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="text-2xl font-bond text-black">Have a Coupon?</Button>
          </PopoverHandler>
          <PopoverContent>
            <input type="text" placeholder="Enter the Coupon" />
          </PopoverContent>
        </Popover>
        </div>
        </div>
        <div>
        <button className=" bg-yellow-300 w-36 rounded-2xl 
        mt-28 text-2xl hover:scale-105 duration-300"
        onClick={()=>displayRazorpay(totalprice)}>
            Checkout</button>
            </div>
        </div>
        
      </div>
     
    </div>
    </div>
)




}