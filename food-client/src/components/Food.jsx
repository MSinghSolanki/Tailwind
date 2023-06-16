import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";


export const Food = () => {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [sortingMethod, setSortingMethod] = useState("none");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleOrders, setVisibleOrders] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

let navigate = useNavigate()

const navigateToCart =()=>{
  navigate('orders')
}

const fetchOrders = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get("https://hungerandbeats-backend.onrender.com/item/store");
    const data = response.data;
    setOrders(data.stores);
    const initialOrders = data.stores.slice(startIndex, endIndex);
    setFilteredOrders(initialOrders);
    setVisibleOrders(initialOrders);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchOrders();
  cartget();
}, []);

const loadMoreOrders = () => {
  if (endIndex >= orders.length) {
    return; // No more orders to load
  }

  const nextStartIndex = startIndex + 4;
  const nextEndIndex = endIndex + 4;
  const nextOrders = orders.slice(nextStartIndex, nextEndIndex);
  setFilteredOrders((prevOrders) => [...prevOrders, ...nextOrders]);
  setVisibleOrders((prevOrders) => [...prevOrders, ...nextOrders]);
  setStartIndex(nextStartIndex);
  setEndIndex(nextEndIndex);
};



  const cartget = async () => {
    try {
      const response = await axios.get("https://hungerandbeats-backend.onrender.com/order/create");
      const data = response.data;
      setCount(data.orders.length);
      console.log(data.orders.length)
    } catch (error) {
      console.log(error);
    }
  };
 


  const filterType = (category) => {
    const filtered = orders.filter((e) => e.category === category);
    setFilteredOrders(filtered);
    setVisibleOrders(filtered.slice(0, endIndex));
  };

  const filterPrice = {
    none: { method: (a, b) => null },
    ascending: { method: (b, a) => (a.price < b.price ? 1 : -1) },
    descending: { method: (a, b) => (a.price > b.price ? -1 : 1) },
  };

  useEffect(() => {
    const method = filterPrice[sortingMethod].method;
    if (method) {
      const sortedOrders = [...filteredOrders].sort((a, b) => method(a, b));
      setVisibleOrders(sortedOrders.slice(0, endIndex));
    } else {
      setVisibleOrders(filteredOrders.slice(0, endIndex));
    }
  }, [sortingMethod, filteredOrders, endIndex]);


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
      {visibleOrders.map((e, ei) => (
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
        {/* Load More button */}
      {!isLoading && visibleOrders.length < orders.length && (
        <button class=" bg-yellow-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={loadMoreOrders}>Load More</button>
      )}
        {/* Loading indicator */}
        {isLoading && <p>Loading...</p>}
    </div>
       {/* Display the cart icon */}
       <div className="fixed bottom-6 right-6 z-10">
      <CartIcon count={count} onClick={navigateToCart} />
    </div>
  </div>
  );
};


// Create a new component for the cart icon
const CartIcon = ({ onClick, count }) => {
  return (
    <div className="relative">
      <div className="absolute -top-2 -right-2">
        {count > 0 && (
          <div className="bg-red-600 rounded-full w-4 h-4 text-white text-xs flex items-center justify-center">
            {count}
          </div>
        )}
      </div>
      <FaShoppingCart
        className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};