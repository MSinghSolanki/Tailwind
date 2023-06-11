import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export const PaymentSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-green-500 text-9xl mb-8">
        <FaCheckCircle />
      </div>
      <h1 className="text-4xl font-bold mb-4">Your transaction is successful</h1>
      <p className="text-lg text-gray-500">
        Thank you for your payment. We appreciate your business.
      </p>
    </div>
  );
};
