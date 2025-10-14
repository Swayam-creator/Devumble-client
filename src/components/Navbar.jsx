import React from 'react'
import { useSelector } from 'react-redux'
const Navbar = () => {
  const user=useSelector(state=>state.user.user[0]);
  return (
    <div>
      <div data-theme="synthwave" className="navbar theme-controller bg-base-100 shadow-amber-300">
  <div className="flex-2 items-center ">
    <a className="btn btn-soft btn-warning text-orange-400 hover:text-black text-xl">Devumble</a>
    {user && (<div className="flex justify-center items-center">
    Welcome <span className=' bg-amber-300 font-2xl font-bold'>{user.firstName}!</span>
    </div>)}
  </div>
  <div className="flex gap-2">
     <div className="dropdown mb-5">
  <div tabIndex={0} role="button" className="btn m-1">
    🔴
    <svg
      width="12px"
      height="12px"
      className="inline-block h-2 w-2 fill-current opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    </svg>
  </div>
  <ul tabIndex="-1" className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Default"
        value="synthwave" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Forest"
        value="forest" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Cyberpunk"
        value="cyberpunk" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Dark"
        value="dark" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Aqua"
        value="aqua" />
    </li>
  </ul>
</div>
    {user && (<div className="dropdown dropdown-end space-x-5 mt-1.5 ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar  ">
        <div className="w-20 rounded-full h-auto " >
          <img
            alt="user img"
            src={user?.profileImage} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div> 
    </div>
  )
}

export default Navbar
