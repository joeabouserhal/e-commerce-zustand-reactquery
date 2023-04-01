import { BsCart } from "react-icons/bs";
import { useCartStore } from "../../stores/cartStore";
const Navbar = () => {
  const store = useCartStore();
  return (
    <nav className="h-[10vh] flex justify-between px-10 shadow border-b border-stone-700 items-center">
      <h1 className="text-4xl">E-Commerce</h1>
      <div className="flex gap-2">
        <BsCart className="ml-0 w-6 h-6" />
        <p>{store.cartItems.length}</p>
      </div>
    </nav>
  );
};

export default Navbar;
