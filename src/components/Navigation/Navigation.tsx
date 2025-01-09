import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Logo from "../../assets/Logo.svg";
import LoginModal from "../Modals/LoginModal";
import SignupModal from "../Modals/SignupModal";
import { useModal } from "../../contexts/ModalContext";
import MenuProfileHolder from "../../assets/menu_profile_holder.svg";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Navigation = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownVisible(false);
  }, [user.isLoggedIn]);

  return (
    <header className="fixed w-full z-10 bg-white shadow-sm !h-20">
      <nav className="flex items-center justify-between mx-auto px-6 h-full">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-full" />
        </div>

        <div className="hidden lg:flex items-center">
          <ul className="flex items-center space-x-10 text-[#949EA0] font-medium text-[14px] leading-[14px] tracking-[0]">
            <li>
              <Link to="/flowers" className="hover:text-[#EAA79E]">
                Flowers
              </Link>
            </li>
            <li>
              <Link to="/sightings" className="hover:text-[#EAA79E]">
                Latest Sightings
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-[#EAA79E]">
                Favorites
              </Link>
            </li>
          </ul>

          {user.isLoggedIn ? (
            <div className="flex items-center space-x-4 ml-12">
              <span className="text-[#949EA0] font-medium text-[14px] leading-[14px] tracking-[0]">
                {user.name}
              </span>
              <img
                src={user.profileImage ?? MenuProfileHolder}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              />
              <div ref={dropdownRef}>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4 ml-12">
              <button
                className="text-[#E19184]"
                onClick={() => showModal(<LoginModal />)}
              >
                Login
              </button>
              <button
                className="px-6 py-2 rounded-full bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E] text-white font-medium shadow-md"
                onClick={() => showModal(<SignupModal />)}
                style={{
                  boxShadow: "rgba(234, 168, 159, 0.2) 0px 15px 20px",
                }}
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        <button
          className="block lg:hidden text-[#949EA0]"
          aria-label="Toggle navigation"
        >
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="1.23077" fill="#949EA0"></rect>
            <rect y="7.38464" width="24" height="1.23077" fill="#949EA0"></rect>
            <rect y="14.7693" width="24" height="1.23077" fill="#949EA0"></rect>
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
