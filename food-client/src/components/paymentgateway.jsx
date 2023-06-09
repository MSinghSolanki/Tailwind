import React, { Fragment, useEffect, useState } from "react";
import { Address } from "./address";
import axios from "axios";

export const PaymentGateway = () => {
  const [modal, showModal] = useState(false);
  const [sub, setSub] = useState({
    email: "",
    address: "",
    pincode: "",
    citi: "",
    states: "",
  });
  const [submittedAddress, setSubmittedAddress] = useState(null);

  const getPincodeAddress=(pin)=>{
    axios.get(`https://api.postalpincode.in/pincode/${pin}`).then((res)=>{
    
      setSub({
        ...sub,
        ['citi']:res.data[0].PostOffice[0].District,
        ['states']:res.data[0].PostOffice[0].State
      })
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode" && value.length === 6) {
      getPincodeAddress(value);
    }
    setSub({
      ...sub,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   window.localStorage.setItem("submittedAddress", JSON.stringify(sub));
    showModal(false);
  };
  const handleEditAddress = () => {
    showModal(true);
  };


  useEffect(() => {
    const storedAddress = localStorage.getItem("submittedAddress");
    if (storedAddress) {
      const parsedAddress = JSON.parse(storedAddress);
      setTimeout(() => {
        setSubmittedAddress(parsedAddress);
        setSub(parsedAddress);
      }, 0);
    }
  }, []);

  return (
    <Fragment>
      <div className="">
        <button
          className="bg-yellow-300 rounded-3xl w-52 h-11"
          onClick={() => showModal(true)}
        >
          Add an Address
        </button>
      </div>
      <Address invisible={modal} onClose={() => showModal(false)}>
        <div className="rounded-xl text-2xl max-w-xl shadow-2xl my-48 border-gray-500 bg-white w-4/5">
          <div className="flex">
            <div>
              <h2>Email</h2>
              <input
                onChange={handleChange}
                name="email"
                className="border-2 border-black"
                type="email"
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div>
            <h1>Address</h1>
            <input
              onChange={handleChange}
              name="address"
              className="border-2 border-black"
              type="text"
              placeholder="Enter Your Address"
            />
          </div>
          <div>
            <h1>PinCode</h1>
            <input
              name="pincode"
              onChange={handleChange}
              className="border-2 border-black"
              type="Number"
              placeholder="Enter PinCode"
            />
          </div>
          <div>
            <h1>City</h1>
            <input
              onChange={handleChange}
              name="citi"
              value={sub.citi}
              className="border-2 border-black"
              type="text"
              placeholder="Enter City"
            />
          </div>
          <div>
            <h1>State</h1>
            <input
              onChange={handleChange}
              name="states"
              value={sub.states}
              className="border-2 border-black"
              type="text"
              placeholder="Enter State"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 rounded-lg text-white px-4 py-2 mt-4"
          >
            Submit
          </button>
        </div>
      </Address>

      {submittedAddress && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Submitted Address:</h2>
            <button
              className="text-blue-500 underline"
              onClick={handleEditAddress}
            >
              Edit Address
            </button>
          </div>
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <p className="text-lg">
              <span className="font-bold">Email:</span> {submittedAddress.email}
            </p>
            <p className="text-lg">
              <span className="font-bold">Address:</span> {submittedAddress.address}
            </p>
            <p className="text-lg">
              <span className="font-bold">PinCode:</span> {submittedAddress.pincode}
            </p>
            <p className="text-lg">
              <span className="font-bold">City:</span> {submittedAddress.citi}
            </p>
            <p className="text-lg">
              <span className="font-bold">State:</span> {submittedAddress.states}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};
