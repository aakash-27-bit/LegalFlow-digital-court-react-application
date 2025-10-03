import { userSideBar, adminSideBar, ROLES } from "../../config/constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import logoImage from '../../assets/revamp/navbar_logo.png';

const Sidebar = () => {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    let options = userSideBar;
    const role = useSelector((state) => state.userAccount.role);
    const user = useSelector((state) => state.userAccount);
    if (role === ROLES.ADMIN) options = adminSideBar;

    const isActiveRoute = (itemUrl) => {
        // Special case for new slot registration routes
        if (itemUrl === '/new-registration') {
            return ['/new-registration', '/ticket-management', '/vehicle-monitoring'].includes(location.pathname);
        }
        // Check if current path starts with the menu item's URL
        // This handles both exact matches and nested routes
        return location.pathname.startsWith(itemUrl) ||
            // Special case for home/dashboard
            (itemUrl === '/dashboard' && location.pathname === '/');
    };
    return (
        <div className="sticky left-0 top-0 z-10 h-[100vh] !w-80 bg-[#213555] shadow-lg flex flex-col overflow-none">
            <div className="flex items-center">
                <img src={logoImage} alt="Logo" className="h-40 w-full" />
            </div>
            <ul className="mt-6 space-y-2 text-white">
                {options.map((item, index) => {
                    const Icon = item.icon;
                    if (item.type === "button") {
                        return (
                            <li
                                key={index}
                                className='cursor-pointer pl-4 p-3 transition ease-in-out duration-150 text-gray-200 
                            hover:text-white hover:bg-[#3b5e97]'
                            >
                                <div onClick={() => {
                                    localStorage.removeItem('Access-token');
                                    window.location.replace('/');
                                }} className="flex w-full cursor-pointer items-center space-x-3">
                                    <Icon className="text-lg" />
                                    <span>{item.title}</span>
                                </div>
                            </li>
                        )
                    }
                    return (
                        <li
                            key={index}
                            className={`${isActiveRoute(item.url) ? 'bg-[#3b5e97] text-white' : 'text-gray-200'}cursor-pointer pl-4 p-3 transition ease-in-out duration-150 hover:text-white hover:bg-[#3b5e97]`}
                        >
                            <Link to={item.url} className="flex items-center space-x-3">
                                <Icon className="text-lg" />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            {/* Profile and Notifications Section */}
            <div className="mt-auto mb-4 px-4 space-y-4">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-full flex items-center p-2 text-gray-200 hover:text-white hover:bg-[#3b5e97] rounded-lg transition-colors"
                    >
                        <IoNotificationsOutline className="text-xl" />
                        <span className="ml-2">Notifications</span>
                    </button>
                    {showNotifications && (
                        <div className="absolute bottom-full left-0 w-64 mb-2 bg-white rounded-lg shadow-lg p-2 text-gray-800">
                            <div className="p-2 text-sm">
                                <div className="font-semibold mb-2">Recent Notifications</div>
                                <div className="text-gray-600">No new notifications</div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="w-full flex items-center p-2 text-gray-200 hover:text-white hover:bg-[#3b5e97] rounded-lg transition-colors"
                    >
                        <CgProfile className="text-xl" />
                        <span className="ml-2">Profile</span>
                    </button>
                    {showProfile && (
                        <div className="absolute bottom-full left-0 w-64 mb-2 bg-white rounded-lg shadow-lg p-2 text-gray-800">
                            <div className="p-2">
                                <div className="font-semibold">{user.name || 'User'}</div>
                                <div className="text-sm text-gray-600">{user.email || 'user@example.com'}</div>
                                <div className="mt-2 pt-2 border-t text-sm">
                                    <Link to="/settings" className="block p-1 hover:bg-gray-100 rounded">Settings</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
