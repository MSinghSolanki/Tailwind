import React, { useEffect, useState } from "react";
import axios from "axios";
// import { PaymentGateway } from "./paymentgateway";
// import { Fragment } from "react";
// import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    address: "",
    mobileNumber: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [submittedAddress, setSubmittedAddress] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("https://hungerandbeats-backend.onrender.com/order/create");
      const data = response.data;
      setOrders(data.orders);

      let total = 0;
      data.orders.forEach((order) => {
        total += order.price;
      });
      setTotalPrice(total);
    };

    fetchOrders();
  }, []);

  const checkoutHandler = async () => {
    const { data } = await axios.post("https://hungerandbeats-backend.onrender.com/api/checkout", {
      amount: totalPrice,
    });
    const options = {
      key: "rzp_test_2zLoRmhGoenyic", // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Hunger & Beats", // Your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://hungerandbeats-backend.onrender.com/api/payment",
      prefill: {
        // We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Mohit Singh Solanki", // Your customer's name
        email: "Mohitsinghsolanki8@gmail.com",
        contact: "9057234821", // Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = window.Razorpay(options);

    razor.open();
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const submitAddressForm = (e) => {
    e.preventDefault();
    // Store the submitted address
    setSubmittedAddress(addressData);
    // Reset form fields
    setAddressData({
      address: "",
      mobileNumber: "",
      pincode: "",
      state: "",
      city: "",
    });
    // Hide the address form
    setShowAddressForm(false);
  };

  const handleAddressChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
   <div>
        {/* Button to toggle the address form */}
        <button
          className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
          onClick={toggleAddressForm}
        >
          Add Address
        </button>

        {/* Address form */}
        {showAddressForm && (
          <form onSubmit={submitAddressForm} className="mt-4">
            {/* Add your address form fields here */}
            <div className="mb-4">
              <label htmlFor="address" className="text-lg font-medium">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={addressData.address}
                onChange={handleAddressChange}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobileNumber" className="text-lg font-medium">
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={addressData.mobileNumber}
                onChange={handleAddressChange}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pincode" className="text-lg font-medium">
                Pincode:
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={addressData.pincode}
                onChange={handleAddressChange}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="text-lg font-medium">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={addressData.state}
                onChange={handleAddressChange}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="text-lg font-medium">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleAddressChange}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4">
              Submit Address
            </button>
          </form>
        )}
      </div>
      <div>
      {submittedAddress && (
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Submitted Address:</h2>
          <p>Address: {submittedAddress.address}</p>
          <p>Mobile Number: {submittedAddress.mobileNumber}</p>
          <p>Pincode: {submittedAddress.pincode}</p>
          <p>State: {submittedAddress.state}</p>
          <p>City: {submittedAddress.city}</p>
        </div>
      )}
    </div>
    
      <div>
        <div className="flex justify-around sm:my-10 sm:max-w-5xl xl:my-4 xl:max-w-6xl xl:mt-40">
          <div>
            <h1 className="text-4xl font-bold">Your Shopping Cart</h1>
          </div>
          <div>
            <h1 className="text-red-500 my-3 text-2xl hover:underline">
              <Link to="/">Continue Shopping</Link>
            </h1>
          </div>
        </div>
        <div className="pt-28 flex flex-col lg:flex-row justify-around">
          <div className="flex flex-col justify-center">
            {orders.map((order, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
              >
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                  <img src={order.image} alt={order.name} className="rounded-xl" />
                </div>
                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between item-center">
                    <p className="font-black text-gray-800 md:text-3xl text-xl">{order.name}</p>
                    <p className="text-xl font-black text-gray-800">₹{order.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start">
  <div className="w-full lg:w-2/3 bg-gray-100 shadow-2xl rounded-2xl py-6 px-8">
    <h1 className="text-4xl font-bold mb-6">Order Summary</h1>
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xl">Product Total:</p>
        <p className="text-2xl font-bold">₹{totalPrice}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl">Tax:</p>
        <p className="text-2xl font-bold">₹</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl">Discount:</p>
        <p className="text-2xl font-bold">- ₹</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl">Total Amount:</p>
        <p className="text-2xl font-bold">₹{totalPrice}</p>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
    <button
      className="bg-yellow-300 w-full rounded-2xl text-2xl py-4 hover:scale-105 duration-300 lg:w-56"
      onClick={checkoutHandler}
    >
      Checkout
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};
