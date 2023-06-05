import React from "react"
import { Cards } from "./Cards"
import { Food } from "./Food"
import { Navbar } from "./Navbar"
import { Category } from "./categories"


export const Home =()=>{

return (
    <div>
       
        <Cards/>
        <Food/>
        <Category/>
        
    </div>
)
}