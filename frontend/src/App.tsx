import "./App.css";
import Navbar from "@/components/navbar";
import Game from "@/components/game";
import GamePage from "./pages/game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import home from "./pages/home";

function App() {
  const games = [
    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
