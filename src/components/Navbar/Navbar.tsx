import { BsCart } from "react-icons/bs";
const Navbar = () => {
  return (
    <nav className="h-[10vh] flex justify-between px-10 shadow border-b border-stone-700 items-center">
      <h1 className="text-4xl">E-Commerce</h1>
      <BsCart className="ml-0 w-6 h-6" />
    </nav>
  );
};

export default Navbar;
