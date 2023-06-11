import React, { useState, useEffect } from "react";
import { Address } from "./address";
import axios from "axios";

export const PaymentGateway = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sub, setSub] = useState({
    email: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [submittedAddress, setSubmittedAddress] = useState(null);

  const getPincodeAddress = (pin) => {
    axios.get(`https://api.postalpincode.in/pincode/${pin}`).then((res) => {
      setSub({
        ...sub,
        city: res.data[0].PostOffice[0].District,
        state: res.data[0].PostOffice[0].State,
      });
    });
  };

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
    setIsModalVisible(false);
  };

  const handleEditAddress = () => {
    setIsModalVisible(true);
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
    <>
      <div className="">
        <button
          className="bg-yellow-300 rounded-3xl w-52 h-11 font-bold text-xl"
          onClick={() => setIsModalVisible(true)}
        >
          
          Add an Address
        </button>
      </div>
      <Address invisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <form className="rounded-xl text-2xl max-w-xl shadow-2xl my-48 border-gray-500 bg-white w-4/5 p-8 relative z-50">
          <div className="mb-4">
            <h2>Email</h2>
            <input
              onChange={handleChange}
              name="email"
              className="border-2 border-black p-2 w-full"
              type="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <h2>Address</h2>
            <input
              onChange={handleChange}
              name="address"
              className="border-2 border-black p-2 w-full"
              type="text"
              placeholder="Enter Your Address"
            />
          </div>
          <div className="mb-4">
            <h2>PinCode</h2>
            <input
              name="pincode"
              onChange={handleChange}
              className="border-2 border-black p-2 w-full"
              type="number"
              placeholder="Enter PinCode"
            />
          </div>
          <div className="mb-4">
            <h2>City</h2>
            <input
              onChange={handleChange}
              name="city"
              value={sub.city}
              className="border-2 border-black p-2 w-full"
              type="text"
              placeholder="Enter City"
            />
          </div>
          <div className="mb-4">
            <h2>State</h2>
            <input
              onChange={handleChange}
              name="state"
              value={sub.state}
              className="border-2 border-black p-2 w-full"
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
        </form>
      </Address>

      {submittedAddress && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Submitted Address:</h2>
            <button className="text-blue-500 underline" onClick={handleEditAddress}>
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
              <span className="font-bold">City:</span> {submittedAddress.city}
            </p>
            <p className="text-lg">
              <span className="font-bold">State:</span> {submittedAddress.state}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
