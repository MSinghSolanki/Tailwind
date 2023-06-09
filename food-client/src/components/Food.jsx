import { data } from "../Data/data.js";
import { useEffect, useState } from "react";
import axios from "axios"
import { AiFillHeart } from "react-icons/ai";

export const Food = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
   image:"",
  });
const[sortingMethod,setSortingMethod] =useState("none");
 


  const [foods, setFoods] = useState(data);

  const filtertype = (category) => {
    setFoods(
      data.filter((e) => {
        return e.category === category;
      })
    );
  };
  //  Filter price
  const filterprice = {
    none: { method: (a, b) => null },
    ascending: { method: (b, a) => (a < b ? 1 : -1) },
    descending: { method: (a, b) => (a > b ? -1 : 1) },
  };

  useEffect(() => {
    const method = filterprice[sortingMethod].method;
    if (method) {
      setFoods([...foods].sort((a, b) => method(a.price, b.price)));
    } else {
      setFoods(data);
    }
  }, [sortingMethod]);


  const handlefavourite = (e) => {
    const data = {
      name: e.name,
      price: e.price,
       image:e.image,
    };
    console.log(e)
  
    axios.post("http://localhost:2754/favourite/fav", data)
      .then(() => {
        setFormData({
          name: "",
          price: "",
          image:null,
        });
        console.log(setFormData)
        console.log(data.data)
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleOrderNow = (e) => {
    const data = new FormData();
    data.append("name", e.name);
    data.append("price", e.price);
    data.append("image", selectedImage);


    // Make the POST request
    axios
      .post("http://localhost:2754/order/create", data)
      .then(() => {
        setFormData({
          name: "",
          price: "",
         image:null,
        });
        console.log(setFormData);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
 
  return (
    <div className="max-w-[1980px] m-auto px-4 py-12">
      <h1 className="text-red-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>

      {/* Filter row */}
      <div className="flex flex-col  justify-between">
        {/* Filter type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => setFoods(data)}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => filtertype("burger")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Burgers
            </button>
            <button
              onClick={() => filtertype("pizza")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Pizza
            </button>
            <button
              onClick={() => filtertype("salad")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Salads
            </button>
            <button
              onClick={() => filtertype("chicken")}
              className=" m-1 border-red-600 text-red-600 hover:bg-orange-600 hover:rounded-full hover:text-white"
            >
              Chicken
            </button>
          </div>
        </div>
        {/* Filter price */}
        <div>
          
          <select value={sortingMethod}
          onChange={(e)=>setSortingMethod(e.target.value)}>
        <option value="none" disabled>None</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
          
       
        
      </div>
      {/* Display food */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4" >
        {foods.map((e, ei) => (
          <div
            key={ei}
            className="boder shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img   onClick={ (event) => {
          console.log(event.target.files);
          setSelectedImage(event.target.files)
            }}
            name="image" src={e.image} alt={e.name} 
            className="w-full h-[200px] object-cover rounded-t-lg"
            />
              <AiFillHeart size={40} onClick={()=>{
               
                handlefavourite(e)
              }}
      
              className=" hover:text-red-600 cursor-pointer text-gray-200"/>

<button  onClick={()=>{handleOrderNow(e)}} className="bg-gray-400 text-white rounded-r-3xl w-32 h-11 hover:bg-black hover:text-white my-3" >Order Now</button>
            <div className="flex justify-between px-2 py-4">
              <p name="name" className="font-bold">{e.name}</p>
             
              <span name="price" className="bg-orange-500 text-white p-1 rounded-full">
                {e.price}
              </span>
              
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
    
  );
};
