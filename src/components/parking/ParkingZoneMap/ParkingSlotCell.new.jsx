import React from 'react';
import { BsCameraVideoFill, BsLightningChargeFill } from 'react-icons/bs';
import { BiSolidCarGarage } from 'react-icons/bi';
import { TbCurrencyRupee } from 'react-icons/tb';
import { AiOutlineClockCircle } from 'react-icons/ai';

const ParkingSlotCell = ({ slotData, onClick, onMouseEnter, onMouseLeave, isActive }) => {
  const handleClick = () => onClick?.(slotData);
  const handleMouseEnter = (e) => onMouseEnter?.(e, slotData);
  const handleMouseLeave = () => onMouseLeave?.();
  const isAvailable = slotData.status === 'AVAILABLE';
  
  return (
    <div
      className={`transition-all duration-300 cursor-pointer rounded-2xl p-4 relative
        ${isActive ? 'transform scale-105' : 'hover:scale-102'}
        ${isAvailable ? 'bg-[#E8FFE9]' : 'bg-[#FFE8E8]'}`}
      style={{
        boxShadow: '0 0 0 2px rgba(167, 215, 255, 0.5)',
        minWidth: isActive ? '280px' : '220px',
        minHeight: '200px'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Premium Zone Label */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-[#A7D7FF] text-[#2B2B2B] text-sm px-4 py-1 rounded-full whitespace-nowrap">
          Premium Zone
        </div>
      </div>

      {/* Slot Number */}
      <div className="text-3xl font-bold text-center my-6">
        {slotData.slotNumber}
      </div>

      {isActive ? (
        <>
          {/* Features in Active State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-2 rounded-lg flex items-center gap-2">
              <BsCameraVideoFill className="text-blue-500" />
              <span className="text-sm">CCTV Monitoring</span>
            </div>
            {slotData.features?.includes('EV Charging') && (
              <div className="bg-white p-2 rounded-lg flex items-center gap-2">
                <BsLightningChargeFill className="text-green-500" />
                <span className="text-sm">EV Charging</span>
              </div>
            )}
            <div className="bg-white p-2 rounded-lg flex items-center gap-2">
              <BiSolidCarGarage className="text-gray-600" />
              <span className="text-sm">Covered Parking</span>
            </div>
            <div className="bg-white p-2 rounded-lg flex items-center gap-2">
              <TbCurrencyRupee className="text-yellow-500" />
              <span className="text-sm">Rate: ₹5/hr</span>
            </div>
          </div>

          {/* Available Button in Active State */}
          {isAvailable && (
            <>
              <div className="mt-4 bg-green-500 text-white text-center py-2 rounded-lg font-medium">
                AVAILABLE
              </div>
              <div className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-500">
                <AiOutlineClockCircle />
                <span>Last Updated: 1 min ago</span>
              </div>
            </>
          )}
        </>
      ) : (
        /* Inactive State */
        <>
          {/* Feature Icons Row */}
          <div className="flex justify-center gap-4 mt-4">
            <BsCameraVideoFill className="text-gray-400" />
            {slotData.features?.includes('EV Charging') && (
              <BsLightningChargeFill className="text-gray-400" />
            )}
            <BiSolidCarGarage className="text-gray-400" />
            <TbCurrencyRupee className="text-gray-400" />
          </div>

          {/* Available Text in Inactive State */}
          {isAvailable && (
            <div className="mt-4 text-green-500 text-center font-medium">
              Available
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ParkingSlotCell;
