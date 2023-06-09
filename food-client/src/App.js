import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Wallet } from "./components/Wallet";
import { Invite } from "./components/invite";
import { Orders } from "./components/Orders";
import { Favourite} from "./components/favourite";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { PaymentSuccessPage } from "./components/paymentsuccess";
import { Footer } from "./components/footer";

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
        <Route path="paymentsuccess" element={<PaymentSuccessPage/>}/>
        
      </Routes>
    
       <Footer/>
    </div>
  );
}

export default App;
