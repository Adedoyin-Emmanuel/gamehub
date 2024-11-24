import "./App.css";
import GamePage from "./pages/game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<GamePage/>} path="/:gameId" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
