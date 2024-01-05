import Logo from "../assets/StackLogo.svg";
import Search from "./Search";
import { Link } from "react-router-dom";
import LoggedNavbar from "./LoggedNavbar";
import UnloggedNavbar from "./UnLoggedNavbar";
import { useState, useEffect } from "react";
import { supabase } from "../main";

export default function Navbar() {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setVisible(true);

      if (session) {
        setIsloggedin(true);
      } else {
        setIsloggedin(false);
      }
    });
  }, []);

  return (
    <div className='navbarContainer'>
      <nav className='navbar'>
        <div className='px-3 py-3 h-full cursor-pointer navBg'>
          <Link to={isLoggedin ? "/home" : "/"}>
            <img src={Logo} alt='' className='' />
          </Link>
        </div>

        <ul className='flex items-center text-sm gap-1 w-[240px] hidden md:flex'>
          <li className='px-3 py-1.5 rounded-full navBg text-gray-500 text-[13px]'>
            <Link to={"/home"}>Home</Link>
          </li>
          <li className='px-3 py-1.5 rounded-full navBg text-gray-500 text-[13px]'>
            <Link to={"/users"}>Users</Link>
          </li>
          <li className='px-3 py-1.5 rounded-full navBg text-gray-500 text-[13px]'>
            <Link to={"/questions"}>Questions</Link>
          </li>
        </ul>
        <div className='flex items-center relative'>
          <Search />
        </div>
        <div className={isVisible ? "flex items-center" : "hidden"}>
          {isLoggedin ? <LoggedNavbar /> : <UnloggedNavbar />}
        </div>
      </nav>
    </div>
  );
}
