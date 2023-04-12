import { data } from "../Data/data.js";
import { useState } from "react";
export const Food = () => {
  const [foods, setFoods] = useState(data);

  const filtertype = (category) => {
    setFoods(
      data.filter((e) => {
        return e.category === category;
      })
    );
  };
  //  Filter price
  const filterprice = (price) => {
    setFoods(
      data.filter((e) => {
        return e.price === price;
      })
    );
  };
  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-red-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>

      {/* Filter row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Filter type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => setFoods(data)}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => filtertype("burger")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              Burgers
            </button>
            <button
              onClick={() => filtertype("pizza")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              Pizza
            </button>
            <button
              onClick={() => filtertype("salad")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              Salads
            </button>
            <button
              onClick={() => filtertype("chicken")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              Chicken
            </button>
          </div>
        </div>
        {/* Filter price */}
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              onClick={() => filterprice("$")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              $
            </button>
            <button
              onClick={() => filterprice("$$")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              $$
            </button>
            <button
              onClick={() => filterprice("$$$")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              $$$
            </button>
            <button
              onClick={() => filterprice("$$$$")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              $$$$
            </button>
            <button
              onClick={() => filterprice("$$$$$")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:text-white"
            >
              $$$$$
            </button>
          </div>
        </div>
      </div>
      {/* Display food */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4" >
        {foods.map((e, ei) => (
          <div
            key={ei}
            className="boder shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={e.image}
              alt={e.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{e.name}</p>
              <span className="bg-orange-500 text-white p-1 rounded-full">
                {e.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
