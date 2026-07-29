import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        <NavLink
          to="/"
          className="flex items-center gap-3 text-3xl font-bold text-green-700"
        >
          <FaSearch />
          <span>Anveshi</span>
        </NavLink>

        <div className="flex items-center gap-10 text-gray-700 font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-700" : "hover:text-green-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "text-green-700" : "hover:text-green-700"
            }
          >
            Browse
          </NavLink>

          <NavLink
            to="/create"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
          >
            Report Item
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;