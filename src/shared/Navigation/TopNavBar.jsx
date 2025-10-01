import React from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { BiSync } from 'react-icons/bi';

import { useTopNav } from '../contexts/TopNavContext';

const TopNavBar = () => {
  const { topNavConfig } = useTopNav();
  return (
    <div className="bg-white border-b">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Title and Description */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{topNavConfig.title}</h1>
            <p className="text-gray-600 mt-1">{topNavConfig.description}</p>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex gap-4">
            {topNavConfig.buttons?.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className={`flex items-center gap-2 px-4 py-2 ${
                  index === 0 
                    ? 'bg-[#0095FF] hover:bg-blue-600' 
                    : 'bg-[#2B3479] hover:bg-blue-900'
                } text-white rounded-lg transition-colors`}
              >
                {button.icon === 'upload' && <IoCloudUploadOutline className="text-xl" />}
                {button.icon === 'sync' && <BiSync className="text-xl" />}
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
