import { userSideBar, adminSideBar, ROLES } from "../../config/constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImage from '../../assets/revamp/navbar_logo.png';

const Sidebar = () => {
    const location = useLocation();
    let options = userSideBar;
    const role = useSelector((state) => state.userAccount.role);
    if (role === ROLES.ADMIN) options = adminSideBar;
    return (
        <div className="sticky left-0 top-0 z-10 h-[100vh] w-56 bg-[#213555] shadow-lg flex flex-col overflow-none">
            <div className=" flex items-center">
                <img src={logoImage} alt="Logo" className="h-24 w-full" />
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
                            className={`${location.pathname === item.url && 'bg-[#3b5e97]'} cursor-pointer pl-4 p-3 transition ease-in-out duration-150 text-gray-200 
                            hover:text-white hover:bg-[#3b5e97]`}
                        >
                            <Link to={item.url} className="flex items-center space-x-3">
                                <Icon className="text-lg" />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })
                }
            </ul>
        </div >
    );
};

export default Sidebar;
