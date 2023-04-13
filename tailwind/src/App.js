import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Cards } from "./components/Cards";
import { Food } from "./components/Food";
import { Category } from "./components/categories";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Cards />
      <Food />
      <Category />
      <footer className="bg-black text-center text-white">
        <h1>©2023 Hunger and Beat,Inc.All rights reserved. </h1>
      </footer>
    </div>
  );
}

export default App;
