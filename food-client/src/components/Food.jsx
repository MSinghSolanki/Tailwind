import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";

export const Food = () => {
  const [orders, setOrders] = useState([]);
  const [sortingMethod, setSortingMethod] = useState("none");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://hungerandbeats-backend.onrender.com/item/store");
      const data = response.data;
      setOrders(data.stores);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filterType = (category) => {
    const filtered = orders.filter((e) => e.category === category);
    setFilteredOrders(filtered);
  };

  const filterPrice = {
    none: { method: (a, b) => null },
    ascending: { method: (b, a) => (a.price < b.price ? 1 : -1) },
    descending: { method: (a, b) => (a.price > b.price ? -1 : 1) },
  };

  useEffect(() => {
    const method = filterPrice[sortingMethod].method;
    if (method) {
      const sortedOrders = [...orders].sort((a, b) => method(a, b));
      setFilteredOrders(sortedOrders);
    } else {
      setFilteredOrders(orders);
    }
  }, [sortingMethod, orders]);

  const createOrder = async (e) => {
    try {
      const formData = {
        id: e.id,
        name: e.name,
        price: e.price,
        image: e.image,
      };

      await axios.post("https://hungerandbeats-backend.onrender.com/order/create", formData);
    } catch (error) {
      console.log(error);
    }
  };
  const favorder = async (e) => {
    try {
      const formData = {
        id: e.id,
        name: e.name,
        price: e.price,
        image: e.image,
      };

      await axios.post("https://hungerandbeats-backend.onrender.com/favourite/fav", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1980px] m-auto px-4 py-12">
      <h1 className="text-red-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>

      {/* Filter row */}
      <div className="flex flex-col justify-between">
        {/* Filter type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={fetchOrders}
              className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => filterType("Burgers")}
              className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Burgers
            </button>
            <button
              onClick={() => filterType("Pizza")}
              className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Pizza
            </button>
            <button
              onClick={() => filterType("Salad")}
              className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Salads
            </button>
            <button
              onClick={() => filterType("Paneer")}
              className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Paneer
            </button>
          </div>
        </div>
        {/* Filter price */}
        <div>
          <select
            value={sortingMethod}
            onChange={(e) => setSortingMethod(e.target.value)}
          >
            <option value="none" disabled>
              None
            </option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>
      {/* Display food */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {filteredOrders.map((e, ei) => (
          <div
            key={ei}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              name="image"
              src={e.image}
              alt={e.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <AiFillHeart
              size={40}
              onClick={() => {favorder(e)}}
              className="hover:text-red-600 cursor-pointer text-gray-200"
            />

            <button
              onClick={() => createOrder(e)}
              className="bg-gray-400 text-white rounded-r-3xl w-32 h-11 hover:bg-black hover:text-white my-3"
            >
              Order Now
            </button>
            <div className="flex justify-between px-2 py-4">
              <p name="name" className="font-bold">
                {e.name}
              </p>

              <span name="price" className="bg-orange-500 text-white p-1 rounded-full">
                {e.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
