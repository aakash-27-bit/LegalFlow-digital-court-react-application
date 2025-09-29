import React from 'react';
import { BsCameraVideoFill, BsLightningChargeFill } from 'react-icons/bs';
import { BiSolidCarGarage } from 'react-icons/bi';
import { TbCurrencyRupee } from 'react-icons/tb';

const ParkingSlotCell = ({ slotData, onClick, onMouseEnter, onMouseLeave, isActive }) => {
  const handleClick = () => onClick?.(slotData);
  const handleMouseEnter = (e) => onMouseEnter?.(e, slotData);
  const handleMouseLeave = () => onMouseLeave?.();

  const hasFeature = (feature) => slotData.features.includes(feature);

  return (
    <div
      className={`transition-all duration-300 ease-in-out cursor-pointer rounded-2xl p-4 relative ${isActive ? 'w-64 bg-[#F1FFE7]' : 'w-48 h-48 bg-[#F1FFE7]'
      }`}
      style={{
        boxShadow: '0 0 0 2px rgba(154, 226, 255, 0.5)',
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Zone Badge */}
      <div className="absolute -top-3 left-4 bg-[#E1F1FF] text-[#5698E5] px-3 py-1 rounded-full text-sm font-medium">
        {slotData.zone}
      </div>

      {isActive ? (
        <div className="space-y-4">
          <div className="text-2xl font-bold text-gray-800 mt-2">{slotData.slotNumber}</div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-2">
            {hasFeature('CCTV Monitoring') && (
              <div className="bg-white p-2 rounded-lg flex items-center gap-2">
                <BsCameraVideoFill className="text-gray-600" />
                <span className="text-sm">CCTV Monitoring</span>
              </div>
            )}
            {hasFeature('EV Charging') && (
              <div className="bg-white p-2 rounded-lg flex items-center gap-2">
                <BsLightningChargeFill className="text-gray-600" />
                <span className="text-sm">EV Charging</span>
              </div>
            )}
            {hasFeature('Covered Parking') && (
              <div className="bg-white p-2 rounded-lg flex items-center gap-2">
                <BiSolidCarGarage className="text-gray-600" />
                <span className="text-sm">Covered Parking</span>
              </div>
            )}
            <div className="bg-white p-2 rounded-lg flex items-center gap-2">
              <TbCurrencyRupee className="text-gray-600" />
              <span className="text-sm">Rate: {slotData.rate}/hr</span>
            </div>
          </div>

          {/* Availability Status */}
          <div className="space-y-1">
            <div className={`text-white py-2 rounded-lg text-center font-medium ${slotData.status === 'AVAILABLE' ? 'bg-[#4CD964]' : 'bg-[#FF3B30]'
              }`}>
              {slotData.status}
            </div>
            <div className="text-gray-500 text-xs text-center">
              Last updated: {slotData.lastUpdated}
            </div>
          </div>
        </div>
      ) : (
          <div className="flex flex-col h-full">
            <div className="text-2xl font-bold text-gray-800 mt-2">{slotData.slotNumber}</div>

            {/* Mini Features Grid */}
            <div className="flex gap-2 mt-4">
              {hasFeature('CCTV Monitoring') && <BsCameraVideoFill className="text-gray-600" />}
              {hasFeature('EV Charging') && <BsLightningChargeFill className="text-gray-600" />}
              {hasFeature('Covered Parking') && <BiSolidCarGarage className="text-gray-600" />}
              <TbCurrencyRupee className="text-gray-600" />
            </div>

            {/* Available Status */}
            <div className="mt-auto mb-4 flex items-center text-[#4CD964]">
              <div className={`w-2 h-2 rounded-full mr-2 ${slotData.status === 'AVAILABLE' ? 'bg-[#4CD964]' : 'bg-[#FF3B30]'
                }`} />
              <span className="text-sm font-medium">{slotData.status}</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default ParkingSlotCell;
