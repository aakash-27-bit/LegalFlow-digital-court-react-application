import React, { useState, useMemo, useEffect } from 'react';
import ParkingZoneMap from '../parking/ParkingZoneMap/ParkingZoneMap';
import { Dialog } from '@headlessui/react';
import { All_SPOTS_DATA } from '../../constants/PMS_CONSTANTS/ParkingSpots';
import { useTopNav } from '../../shared/contexts/TopNavContext';

const AdminDashboard = () => {
    const { updateTopNav } = useTopNav();
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     updateTopNav({
    //         title: "Parking Management System",
    //         description: "Monitor and manage parking spaces across all floors",
    //         buttons: [
    //             {
    //                 label: "Import Vehicle Data",
    //                 icon: "upload",
    //                 action: () => console.log("Import clicked")
    //             },
    //             {
    //                 label: "Sync Sensors",
    //                 icon: "sync",
    //                 action: () => console.log("Sync clicked")
    //             }
    //         ]
    //     });
    // }, [updateTopNav]);

    // Transform the floor data into the format expected by ParkingZoneMap
    const floorData = useMemo(() => {
        const currentFloor = All_SPOTS_DATA.floors.find(f => f.floor === selectedFloor);
        if (!currentFloor) return [];

        return currentFloor.spots.map(spot => ({
            id: spot.spotNumber,
            slotNumber: spot.spotNumber,
            zone: spot.zone,
            status: spot.driverId ? 'OCCUPIED' : 'AVAILABLE',
            rate: 55,
            features: [
                ...(spot.isEV ? ['EV Charging'] : []),
                'CCTV Monitoring',
                'Covered Parking'
            ],
            isReserved: spot.isReserved,
            driverId: spot.driverId,
            lastUpdated: '1 min ago'
        }));
    }, [selectedFloor]);

    const handleSpotClick = (spotData) => {
        setSelectedSpot(spotData);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Parking Management Dashboard</h1>
                <div className="flex items-center gap-4">
                    <label className="font-medium">Floor: {' '}</label>
                    <select
                        value={selectedFloor}
                        onChange={(e) => setSelectedFloor(Number(e.target.value))}
                        className="px-3 py-2 border rounded-md"
                    >
                        {[1, 2, 3, 4, 5].map(floor => (
                            <option key={floor} value={floor}>
                                Floor {floor}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Parking Zone Map */}
            <div className="bg-white max-h-[80vh] overflow-hidden rounded-lg shadow-lg p-6">
                <ParkingZoneMap
                    slots={floorData}
                    onSlotClick={handleSpotClick}
                    isLoading={false}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
