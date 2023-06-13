import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import {Link} from "react-router-dom";
export const Food = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortingMethod, setSortingMethod] = useState("none");
  const [isLoading, setIsLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [formdata,setFormdata] = useState({
    id:"",
    name:"",
    price:"",
    image:""
  })

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:2754/item/store");
      const data = response.data;
      setOrders(data.stores);
      setFilteredOrders(data.stores);
      setIsLoading(false);
      console.log(data.stores)
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtertype = (category) => {
    const filtered = orders.filter((e) => e.category === category);
    setFilteredOrders(filtered);
  };
  useEffect(() => {
    const method = {
      ascending: { method: (b, a) => (a.price < b.price ? 1 : -1) },
      descending: { method: (a, b) => (a.price > b.price ? -1 : 1) },
    }[sortingMethod]?.method;
  
    if (method) {
      setOrders((o) => [...o].sort((a, b) => method(a, b)));
    } else {
      fetchOrders();
    }
  }, [sortingMethod]);


  const createOrder = async (e) => {
    try {
      const formData = {
        id: e.id,
        name: e.name,
        price: e.price,
        image: e.image
      };
  console.log(formData)
      await axios.post("http://localhost:2754/order/create", formData);
      // Reset form data after successful submission
      setFormdata({
        id: "",
        name: "",
        price: "",
        image: ""
      });
      setCartCount((count) => count + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const Favourite = async (e) => {
    try {
      const formData = {
        id: e.id,
        name: e.name,
        price: e.price,
        image: e.image
      };
  console.log(formData)
      await axios.post("http://localhost:2754/favourite/fav", formData);
    } catch (error) {
      console.log(error);
    }
  };
 
  
  const handleCartClick = () => {
    setShowCart(!showCart);
  };


  return (
    <div className="max-w-[1980px] m-auto px-4 py-12">
      {isLoading?(
        <p>Loading......</p>
      ):(
        <>
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
  onClick={() => filtertype("Burgers")}
  className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
>
  Burgers
</button>
<button
  onClick={() => filtertype("Pizza")}
  className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
>
  Pizza
</button>
<button
  onClick={() => filtertype("Salad")}
  className="m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
>
  Salad
</button>
<button
  onClick={() => filtertype("Paneer")}
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
              onClick={() => {Favourite(e)}}
              className="hover:text-red-600 cursor-pointer text-gray-200"
            />

<button
            onClick={() => {
              createOrder(e);
             handleCartClick()
            }}
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
     {/* Cart sidebar */}
     {showCart && (
            <div className="fixed inset-0 flex items-center justify-end z-10">
              <div className="absolute top-0 right-0 h-screen bg-gray-900 w-64 p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="text-white text-lg">Cart</h3>
                  <button
                    className="text-white"
                    onClick={handleCartClick}
                  >
                    Close
                  </button>
                </div>
                <p className="text-white">
                  Total items in cart: {cartCount}
                </p>
                <Link to="orders">
                  <button className="bg-red-600 text-white py-2 px-4 rounded-lg mt-4">
                    Go to Checkout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
