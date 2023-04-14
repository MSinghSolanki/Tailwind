import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Cards } from "./components/Cards";
import { Food } from "./components/Food";
import { Category } from "./components/categories";
import { Wallet } from "./components/Wallet";
import { Promotions } from "./components/promotions";
import { Orders } from "./components/Orders";
import { PaymentGateway } from "./components/paymentgateway";

function App() {
  return (
    <div>
<PaymentGateway/>
      {/* <Navbar />
      <Hero />
      <Cards />
      <Food />
      <Category /> 
     <Wallet/>
       <footer className="bg-black text-center text-white">
        <h1>©2023 Hunger and Beat,Inc.All rights reserved. </h1>
      </footer> */}
    </div>
  );
}

export default App;
