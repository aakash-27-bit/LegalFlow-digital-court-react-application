import React, { useState } from 'react';
import ParkingZoneMap from '../../../components/parking/ParkingZoneMap';
import { Dialog } from '@headlessui/react';

const AdminDashboard = () => {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Example zone risk levels based on occupancy or other metrics
    const zoneRiskData = {
        "ZoneA": "#ef4444", // High risk - red
        "ZoneB": "#eab308", // Medium risk - yellow
        "ZoneC": "#22c55e"  // Low risk - green
    };

    const handleSpotClick = (spotData) => {
        setSelectedSpot(spotData);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Parking Management Dashboard</h1>
                <div className="flex items-center gap-4">
                    <label className="font-medium">Floor:</label>
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
            <div className="bg-white rounded-lg shadow-lg p-6">
                <ParkingZoneMap
                    selectedFloor={selectedFloor}
                    zoneRiskData={zoneRiskData}
                    onSpotClick={handleSpotClick}
                />
            </div>

            {/* Spot Details Modal */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                        <Dialog.Title className="text-lg font-medium mb-4">
                            Spot Details: {selectedSpot?.spotNumber}
                        </Dialog.Title>

                        {selectedSpot && (
                            <div className="space-y-3">
                                <p><span className="font-medium">Zone:</span> {selectedSpot.zone}</p>
                                <p><span className="font-medium">Status:</span> {
                                    selectedSpot.driverId ? 'Occupied' : 'Available'
                                }</p>
                                {selectedSpot.isReserved && (
                                    <p><span className="font-medium">Reserved:</span> Yes</p>
                                )}
                                {selectedSpot.isEV && (
                                    <p><span className="font-medium">EV Charging:</span> Available</p>
                                )}
                                {selectedSpot.driverId && (
                                    <p><span className="font-medium">Driver ID:</span> {selectedSpot.driverId}</p>
                                )}
                                {selectedSpot.vehicleId && (
                                    <p><span className="font-medium">Vehicle ID:</span> {selectedSpot.vehicleId}</p>
                                )}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
