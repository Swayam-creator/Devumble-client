import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const { theme, setTheme } = useTheme();

  const themes = ["synthwave", "corporate", "cyberpunk", "dark", "aqua", "silk"];

  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-300 shadow-lg px-6 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <Link to='/' className="btn btn-soft btn-warning text-orange-400 hover:text-black text-xl">
          Devumble
        </Link>

        {user && (
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg text-base-content">Welcome</span>
            <span className="font-serif text-lg font-semibold text-base-content">
              {user.firstName}!
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Selector */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            🎨 {theme.charAt(0).toUpperCase() + theme.slice(1)}
            <svg
              width="12"
              height="12"
              className="ml-1 h-3 w-3 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content bg-base-200 rounded-box z-[1] w-40 p-2 shadow"
          >
            {themes.map((t) => (
              <li key={t}>
                <button
                  onClick={() => setTheme(t)}
                  className={`w-full btn btn-sm btn-block btn-ghost justify-start ${
                    theme === t ? "btn-active" : ""
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Avatar */}
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img
                  alt="User"
                  src={user?.profileImage || "https://via.placeholder.com/150"}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile/view' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link>Settings</Link></li>
              <li><Link
               to='/logout'
              >Logout</Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
