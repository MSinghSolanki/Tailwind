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
            <h1 className="text-red-500 my-3">
              <Link to="/">Continue Shopping</Link>
            </h1>
          </div>
        </div>
        <div className="pt-28 flex justify-around">
          <div className="">
            {orders.map((order, index) => (
              <div key={index} className="flex max-w-md max-h-52 shadow-2xl bg-slate-100">
                <img src={order.image} alt={order.name} className="w-32 h-32 object-cover rounded-t-lg" />
                <div className="flex">
                  <div>
                    <p className="font-bold pl-4 pt-14 text-3xl">{order.name}</p>
                  </div>
                  <div className="flex flex-col-reverse">
                    <p className="ml-10">{order.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>
              <h1 className="text-5xl font-bold ">Order Summary</h1>
            </div>
            <div className="bg-gray-100 mt-24 shadow-2xl rounded-2xl h-40">
              <h1 className="h-10 font-bold text-2xl my-6">Product Total: ₹{totalPrice}</h1>
              <div>
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Button variant="gradient" className="text-2xl font-bond text-black">
                      Have a Coupon?
                    </Button>
                  </PopoverHandler>
                  <PopoverContent>
                    <input type="text" placeholder="Enter the Coupon" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <button
                className="bg-yellow-300 w-96 rounded-2xl mt-28 text-2xl hover:scale-105 duration-300 h-16"
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
