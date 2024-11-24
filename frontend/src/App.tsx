import "./App.css";
import Navbar from "@/components/navbar";
import Game from "@/components/game";

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <br />
      <Game
        name="Codm"
        imageUrl="https://github.com/adedoyin-emmanuel.png"
        genre="action"
      />
    </div>
  );
}

export default App;
