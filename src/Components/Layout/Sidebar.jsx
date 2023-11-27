import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ArrowRight,
  MessageCircle,
  LogOut,
  Grid,
  Users,
} from "react-feather";
import { GLOBAL } from "../../Services/Common/Lang/lang";

const Options = [
  {
    label: "Home",
    value: "HOME",
    path: "/homepage",
    icon: <Home size={20} />,
  },
  {
    label: "Previous Feedback",
    value: "PREVIOUS_FEEDBACK",
    path: "/previous-feedback",
    icon: <ArrowRight size={20} />,
  },
];

const AdminOptions = [
  {
    label: "Dashboard",
    value: "DASHBOARD",
    path: "/admindashboard",
    icon: <Grid size={20} />,
  },
  {
    label: "Customer Feedback",
    value: "CUSTOMER_FEEDBACK",
    path: "/adminhome",
    icon: <Users size={20} />,
  },
];

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem(GLOBAL.USER_CREDENTIALS));

  const handleLogout = () => {
    localStorage.removeItem(GLOBAL.TOKEN);
    navigate("/");
  };

  const checkUrl = (checkpath) => {
    const currentPath = location.pathname;
    if (currentPath === checkpath) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 sticky top-0">
      <div className="flex flex-row items-center p-2 mb-4 border-b border-gray-300">
        <MessageCircle size={20} />
        <div className="ml-2 font-bold">Feedback System</div>
      </div>
      <nav className="flex flex-col flex-grow">
        <ul className="flex flex-col space-y-6">
          {(userData.type === "ADMIN" ? AdminOptions : Options).map(
            (option) => (
              <li
                key={option.value}
                className={`p-2 hover:bg-gray-300 hover:rounded-md hover:text-black cursor-pointer ${
                  checkUrl(option.path) && "bg-white rounded-md text-black"
                }`}
              >
                <Link
                  to={option.path}
                  onClick={onClose}
                  className="flex items-center"
                >
                  {option.icon && <div className="mr-2">{option.icon}</div>}
                  {option.label}
                </Link>
              </li>
            )
          )}
        </ul>
        <div className="mt-6 bg-red-500 hover:bg-red-700  text-white rounded-md p-2 text-left flex flex-row space-x-2">
          <LogOut />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
