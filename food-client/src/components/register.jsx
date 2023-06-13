import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address } from "./address";

export const RegistrationForm = ({ onSuccess }) => {
  const [modal, showModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(name, email);
    navigate("/", { state: { name, email } });
  };

  return (
    <Fragment>
      <div className="flex justify-center mt-10">
        <button
          className="px-8 py-2 bg-yellow-400 rounded-full text-white font-bold hover:bg-yellow-500 transition duration-300"
          onClick={() => showModal(true)}
        >
          Register
        </button>
      </div>
      <Address invisible={modal} onClose={() => showModal(false)}>
        {modal && (
          <div className="fixed top-0 right-0 z-10 p-2">
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => showModal(false)}
            >
              &times;
            </button>
          </div>
        )}
        <div className="bg-gray-200 py-8 px-6 rounded-md relative">
          <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6">
            <label className="text-black text-xl">
              Name:
              <input
                className="mt-2 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-black"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <label className="text-black text-xl">
              Email:
              <input
                className="mt-2 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 text-black"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <button
  className="px-4 py-2 sm:px-8 sm:py-2 bg-yellow-400 rounded-full text-white font-bold text-sm sm:text-base hover:bg-yellow-500 transition duration-300"
  onClick={() => showModal(true)}
>
  Register
</button>
          </form>
        </div>
      </Address>
    </Fragment>
  );
};
