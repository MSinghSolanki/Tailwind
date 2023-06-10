import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaymentGateway } from "./paymentgateway";
import { Fragment } from "react";
import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:2754/order/create");
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
    const { data } = await axios.post("http://localhost:2754/api/checkout", {
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
      callback_url: "http://localhost:2754/api/payment",
      prefill: {
        // We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Mohit Singh Solanki", // Your customer's name
        email: "Mohitsinghsolanki8@gmail.com",
        contact: "4141414414114", // Provide the customer's phone number for better conversion rates
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

  return (
    <div>
      <PaymentGateway />

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
