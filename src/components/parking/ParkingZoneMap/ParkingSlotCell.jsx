import React, { useState } from 'react';
import { BsCameraVideoFill, BsLightningChargeFill } from 'react-icons/bs';
import { BiSolidCarGarage } from 'react-icons/bi';
import { TbCurrencyRupee } from 'react-icons/tb';

const ParkingSlotCell = ({ slotData, onClick, onMouseEnter, onMouseLeave, isActive }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleAvailableClick = () => {
    setShowModal(false);
    onClick?.(slotData);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleMouseEnter = (e) => onMouseEnter?.(e, slotData);
  const handleMouseLeave = () => {
    onMouseLeave?.();
    if (!isActive) {
      setShowModal(false);
    }
  };

  const isAvailable = slotData.status === 'AVAILABLE';

  const hasFeature = (feature) => {
    return slotData.features?.includes(feature);
  };

  const renderFeatureGrid = () => (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white p-2 rounded-lg flex items-center gap-2">
        <BsCameraVideoFill className="text-blue-500" />
        <span className="text-sm">CCTV Monitoring</span>
      </div>
      {hasFeature('EV Charging') && (
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
        <span className="text-sm">Rate: ₹{slotData.rate || '5'}/hr</span>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`transition-all duration-300 cursor-pointer rounded-2xl p-4 relative
          ${showModal ? 'transform scale-105' : 'hover:scale-102'}
          ${isAvailable ? 'bg-[#F1FFE7]' : 'bg-[#FFE8E8]'}`}
        style={{
          boxShadow: '0 0 0 2px rgba(167, 215, 255, 0.5)',
          minWidth: showModal ? '280px' : '220px',
          minHeight: '200px'
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Premium Zone Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#A7D7FF] text-[#2B2B2B] text-sm px-4 py-1 rounded-full whitespace-nowrap">
            {slotData.zone || 'Premium Zone'}
          </div>
        </div>

        {/* Slot Number */}
        <div className="text-3xl font-bold text-center my-6">
          {slotData.slotNumber}
        </div>

        {/* Simple Icons View when not in modal */}
        {!showModal && (
          <div className="flex flex-col h-full">
            <div className="flex gap-2 mt-4 justify-center">
              {hasFeature('CCTV Monitoring') && <BsCameraVideoFill className="text-gray-600" />}
              {hasFeature('EV Charging') && <BsLightningChargeFill className="text-gray-600" />}
              {hasFeature('Covered Parking') && <BiSolidCarGarage className="text-gray-600" />}
              <TbCurrencyRupee className="text-gray-600" />
            </div>
            <div className="mt-auto mb-4 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isAvailable ? 'bg-[#4CD964]' : 'bg-[#FF3B30]'
                }`} />
              <span className={`text-sm font-medium ${isAvailable ? 'text-[#4CD964]' : 'text-[#FF3B30]'
                }`}>
                {isAvailable ? 'Available' : slotData.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            {renderFeatureGrid()}
            <div className="space-y-2 mt-4">
              <button
                onClick={handleAvailableClick}
                className={`w-full text-white py-2 rounded-lg text-center font-medium
                  ${isAvailable ? 'bg-[#4CD964]' : 'bg-[#FF3B30]'}`}
              >
                {isAvailable ? 'AVAILABLE' : slotData.status}
              </button>
              <div className="text-gray-500 text-xs text-center">
                Last updated: {slotData.lastUpdated || '1 min ago'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParkingSlotCell;
