import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const Navbar = () => {
  return (
    <div className={"w-full border p-3 flex items-center justify-between"}>
      <Link to={"/"}>
        <h2 className={"text-2xl font-bold"}>Gamehub</h2>
      </Link>

      <Button>Add new game</Button>
    </div>
  );
};

export default Navbar;
