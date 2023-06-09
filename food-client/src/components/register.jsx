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
    onSuccess(name, email); // Call onSuccess with name and email
    navigate("/", { state: { name, email } });
  };

  return (
    <Fragment>
      <div className="">
        <button className="bg-yellow-300 rounded-3xl w-24 h-6" onClick={() => showModal(true)}>
          Register
        </button>
      </div>
      <Address invisible={modal} onClose={() => showModal(false)}>
        <form onSubmit={handleSubmit}>
          <div className="flex bg-slate-100 h-18 ">
            <label>
              Name:
              <input className="text-2xl " type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Email:
              <input className="text-2xl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <br />
          <button className="bg-yellow-400 rounded-3xl text-white text-xl w-40" type="submit">
            Register
          </button>
        </form>
      </Address>
    </Fragment>
  );
};
