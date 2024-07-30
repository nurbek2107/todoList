import { useEffect, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { logout } from "../app/userSlice";

function themeFromLocalStorage() {
  return localStorage.getItem("theme") || "wireframe";
}

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(themeFromLocalStorage());

  const handleOut = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon!");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTheme = () => {
    const newTheme = theme === "wireframe" ? "dark" : "wireframe";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 w-10">
      <ul className="menu bg-base-200 rounded-box p-3">
        <li className="mb-3">
          <NavLink to="/">
            <FaHome className="h-6 w-6" />
          </NavLink>
        </li>
        <li className="mb-3">
          <button onClick={handleTheme} className="btn btn-ghost btn-circle">
            {theme === "wireframe" ? (
              <IoIosSunny className="w-6 h-6" />
            ) : (
              <IoIosMoon className="w-6 h-6" />
            )}
          </button>
        </li>
        <div className="mt-2 mb-3">
          {user ? (
            <div className="tooltip tooltip-right" data-tip={user.displayName}>
              <div tabIndex="0" role="button" className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gukc7EnLg2lXrV35IoDl3SrhFbupHeJhuw&s"
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-ghost">
              Login
            </NavLink>
          )}
        </div>
        <li>
          <button onClick={handleOut} className="btn btn-ghost btn-circle">
            <CiLogout className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
