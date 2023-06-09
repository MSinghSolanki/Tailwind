
import React from "react";
import { TbTruckDelivery } from "react-icons/tb";


export const Hero = ()=>{

    return(
        <div className="max-w-[1980px] mx-auto p-4">
            <div className="max-h-[500px] relative">
                {/* Overlay */}
                <div className="absolute w-full text-gray-200 max-h-[500px]
                bg-black/40 flex flex-col justify-center">
                    <h1 className="px-4 text-4xl sm:text-5xl  md:text-6xl lg:text-7xl font-bold">The<span className="text-orange-500 ">Best</span> </h1>
                    <h1 className="px-4 text-4xl sm:text-5xl  md:text-6xl lg:text-7xl font-bold flex" >Food <span className="text-orange-500 hover:animate-bounce" >Delivered</span>
                    <TbTruckDelivery className="hover:text-black hover:animate-bounce"/></h1>
                </div>
                <img className="w-full max-h-[500px] object-cover" src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="/"/>
            </div>
        </div>
    )
}