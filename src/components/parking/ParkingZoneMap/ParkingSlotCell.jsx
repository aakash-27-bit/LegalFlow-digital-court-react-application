import { useState } from 'react';

const ParkingSlotCell = ({ slot }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive(!active);

  return (
    <div
      className={`transition-transform duration-300 ease-in-out cursor-pointer rounded-xl shadow-md p-2 ${
        active ? 'scale-105 bg-[#FFEAEA] text-[#748DAE] w-64' : 'bg-[#9ECAD6] text-white w-20 h-20'
      }`}
      onClick={toggleActive}
    >
      {active ? (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between font-semibold">
            <span>{slot.slotNumber}</span>
            <span>💎 {slot.zoneType}</span>
          </div>
          <div>📍 Floor: {slot.floor} | Section: {slot.section}</div>
          <div>Status: {slot.status === 'AVAILABLE' ? '🟢 Available' : '🔴 Occupied'}</div>
          <div>💰 Rate: ₹{slot.rate}/hr</div>
          <div>📐 Size: {slot.dimensions.length}×{slot.dimensions.width} ft</div>
          <div>🔒 Features:</div>
          <ul className="list-none pl-4">
            {slot.features.map((f, i) => (
              <li key={i}>
                {f === 'CCTV' && '🎥 CCTV'}
                {f === 'Charging Point' && '⚡ Charging'}
                {f === 'Covered' && '🏠 Covered'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="font-bold text-lg">{slot.slotNumber}</div>
          <div>{slot.status === 'AVAILABLE' ? '🟢' : '🔴'}</div>
        </div>
      )}
    </div>
  );
};

export default ParkingSlotCell;
