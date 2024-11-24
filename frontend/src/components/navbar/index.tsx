import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={"border p-3"}>
      <Link to={"/"}>
        <h2 className={"text-2xl font-bold"}>Gamehub</h2>
      </Link>
    </div>
  );
};

export default Navbar;
