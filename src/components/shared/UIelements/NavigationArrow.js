import React, { useEffect } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const defaultRoutes = [
  { path: '/driver-details', label: 'Driver Details' },
  { path: '/ticket-management', label: 'Ticket Management' },
  { path: '/vehicle-monitoring', label: 'Vehicle Monitoring' }
];

const NavigationArrow = ({ routes = defaultRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentRouteIndex, setCurrentRouteIndex] = React.useState(0);

  useEffect(() => {
    const currentIndex = routes.findIndex(route => route.path === location.pathname);
    if (currentIndex !== -1) {
      setCurrentRouteIndex(currentIndex);
    }
  }, [location.pathname, routes]);

  const handleNextRoute = () => {
    const nextIndex = (currentRouteIndex + 1) % routes.length;
    setCurrentRouteIndex(nextIndex);
    navigate(routes[nextIndex].path);
  };

  const handlePrevRoute = () => {
    const prevIndex = (currentRouteIndex - 1 + routes.length) % routes.length;
    setCurrentRouteIndex(prevIndex);
    navigate(routes[prevIndex].path);
  };

  return (
    <div className="fixed top-4 right-4 z-[1000] flex flex-col items-end gap-3">
      <div className="flex items-center gap-4 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-100">
        <button
          onClick={handlePrevRoute}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
          title={routes[(currentRouteIndex - 1 + routes.length) % routes.length].label}
        >
          <BsArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
        </button>
        
        <div className="flex gap-3 px-2">
          {routes.map((route, index) => (
            <div
              key={route.path}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentRouteIndex
                  ? 'bg-blue-600 scale-110 ring-4 ring-blue-100'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={route.label}
              onClick={() => {
                setCurrentRouteIndex(index);
                navigate(route.path);
              }}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>

        <button
          onClick={handleNextRoute}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
          title={routes[(currentRouteIndex + 1) % routes.length].label}
        >
          <BsArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
        </button>
      </div>
      <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-gray-100">
        <span className="text-sm font-medium text-gray-800">
          {routes[currentRouteIndex].label}
        </span>
      </div>
    </div>
  );
};

export default NavigationArrow;
