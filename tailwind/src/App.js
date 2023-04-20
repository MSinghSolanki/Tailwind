import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Cards } from "./components/Cards";
import { Food } from "./components/Food";
import { Category } from "./components/categories";
import { Wallet } from "./components/Wallet";
import { Invite } from "./components/invite";
import { Orders } from "./components/Orders";
import { PaymentGateway } from "./components/paymentgateway";
import { Favourite} from "./components/favourite";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home";

function App() {
  return (
    <div>
<Navbar/>
      <Routes>
        
      <Route path="/" element={<Home/>}/>
        <Route path="wallet" element={<Wallet/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="invite" element={<Invite/>}/>
        <Route path="favourite" element={<Favourite/>}/>
      </Routes>
    
       <footer className="bg-black text-center text-white">
        <h1>©2023 Hunger and Beat,Inc.All rights reserved. </h1>
      </footer>
    </div>
  );
}

export default App;
