export const MONITORING_DATA = [
  {
    id: "VM001",
    vehicleNumber: "DL01AB1234",
    entryTime: "2025-10-04T08:30:00Z",
    exitTime: null,
    parkingZone: "Zone A",
    slotNumber: "A-123",
    status: "active",
    driverDetails: {
      name: "John Doe",
      contactNumber: "9876543210",
      licenseNumber: "DL-20150123456"
    },
    violations: [],
    type: "CAR",
    duration: "2h 30m"
  },
  {
    id: "VM002",
    vehicleNumber: "MH02CD5678",
    entryTime: "2025-10-04T07:15:00Z",
    exitTime: "2025-10-04T09:45:00Z",
    parkingZone: "Zone B",
    slotNumber: "B-456",
    status: "completed",
    driverDetails: {
      name: "Jane Smith",
      contactNumber: "9876543211",
      licenseNumber: "MH-20160234567"
    },
    violations: ["Overtime Parking"],
    type: "SUV",
    duration: "2h 30m"
  },
  {
    id: "VM003",
    vehicleNumber: "KA03EF9012",
    entryTime: "2025-10-04T09:00:00Z",
    exitTime: null,
    parkingZone: "Zone C",
    slotNumber: "C-789",
    status: "warning",
    driverDetails: {
      name: "Bob Wilson",
      contactNumber: "9876543212",
      licenseNumber: "KA-20170345678"
    },
    violations: ["Wrong Spot"],
    type: "BIKE",
    duration: "1h 15m"
  }
];
