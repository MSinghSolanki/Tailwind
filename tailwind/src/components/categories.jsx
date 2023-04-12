import { useState } from "react";
import React from "react";
import { categories } from "../Data/data";

export const Category = () => {
  const [categ, setCateg] = useState(categories);
  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-2xl ">
        {" "}
        Top Rated <span className="text-orange-600 text-2xl">Categories</span>
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {categ.map((e, index) => (
          <div
            key={index}
            className="boder shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              className="w-full-h-[100px] object-cover rounded-t-lg"
              src={e.image}
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{e.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
