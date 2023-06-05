import React, { Fragment, useEffect, useState } from "react";
import { Address } from "./address";
import axios from "axios"
export const PaymentGateway = ()=>{

  const [modal,showModal] = useState(false);
// const [pin,setPin] = useState();
// const[city,setCity] = useState({});
// const[state,setState] = useState({});
const [sub,setSub] =useState({
  email:"",
      address:"",
      pincode:"",
      citi:"",
      states:"",
})



// useEffect(()=>{
//   axios.get(`https://api.postalpincode.in/pincode/${pin}`).then((res)=>{
//     setCity(res.data[0].PostOffice[0].District)
//     setState(res.data[0].PostOffice[0].State)
//   })
// },[pin]);

const getPincodeAddress=(pin)=>{
  axios.get(`https://api.postalpincode.in/pincode/${pin}`).then((res)=>{
    // setCity(res.data[0].PostOffice[0].District)
    // setState(res.data[0].PostOffice[0].State)

    setSub({
      ...sub,
      ['citi']:res.data[0].PostOffice[0].District,
      ['states']:res.data[0].PostOffice[0].State
    })
  })
}

// const handleChange = (e)=>{
//   setPin(e.target.value);
//   const{name,value}=e.target;
//   setSub({
//     ...sub,
//     [name]:value,
//   })
// }

const handlechange = (e)=>{
  const{name,value}=e.target;
  if(name==="pincode"&&value.length===6){
    getPincodeAddress(value)
  }
  setSub({
    ...sub,
    [name]:value,
  })

}


    return(
<Fragment>
      <div className="">
      
        <button className=" bg-yellow-300 rounded-3xl w-52 h-11" onClick={()=>showModal(true)}>Add a Address</button>
      </div>
      <Address invisible={modal} onClose={()=>{
        showModal(false)
      }}>
      
 <div className=" rounded-xl text-2xl max-w-xl shadow-2xl my-48 border-gray-500 bg-white w-4/5">
          
          <div className="flex">
            <div>
                <h2  >Email</h2>
                <input onChange={handlechange} name="email" className=" border-2 border-black" type="email" placeholder="Enter Email"/>
            </div>
          </div>
          <div>
            <h1>Address</h1>
            <input onChange={handlechange} name="address"  className=" border-2 border-black" type="text" placeholder="Enter Your Address"/>
          </div>
          <div>
            <h1>PinCode</h1>
            <input  name="pincode"  onChange={handlechange}  className=" border-2 border-black" type="Number" placeholder="Enter PinCode"/>
          </div>
          <div>
            <h1>City</h1>
            <input onChange={handlechange} name="citi" value={sub.citi}  className=" border-2 border-black" type="text" placeholder="Enter City"/>
          </div>
<div>
    <h1>State</h1>
    <input onChange={handlechange} name="states" value={sub.states}  className=" border-2 border-black" type="text" placeholder="Enter State"/>
</div>
<button onClick={(e)=>{
  e.preventDefault()

  axios.post("http://localhost:8080/address",(sub)).then(()=>{
    setSub({
      email:"",
      address:"",
      pincode:"",
      citi:"",
      states:"",
    })
    console.log(sub)
  })

}} className="bg-blue-300 rounded-full w-32 my-4">Submit</button>
        
        </div>
<div>
  
</div>

        </Address>
      </Fragment>

       
    )
}