import { useState } from "react";
import React from "react";
import { categories } from "../Data/data";

export const Category = () => {
  const [categ, setCateg] = useState(categories);
  return (
    <div className="max-w-[1640px] m-auto px-4 py-12 text-center">
      <h1 className="text-5xl  ">
        {" "}
        Top Rated <span className="text-orange-600 text-6xl ">Categories</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
        {categ.map((e, index) => (
          <div
            key={index}
            className="bg-gray-100  flex justify-between boder shadow-lg rounded-lg p-4
             hover:scale-105 duration-300 items-center"
           >
            <img
              className="w-20 object-cover rounded-t-lg"
              src={e.image}
            />
            <div className=" px-2 py-3">
              <p className="font-bold sm:text-xl ">{e.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
