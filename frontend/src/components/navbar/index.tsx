import { Link } from "react-router-dom";
import GameModal from "../gamemodal";
const Navbar = () => {
  return (
    <div className={"w-full border p-3 flex items-center justify-between"}>
      <Link to={"/"}>
        <h2 className={"text-2xl font-bold"}>Gamehub</h2>
      </Link>

      <GameModal />
    </div>
  );
};

export default Navbar;
