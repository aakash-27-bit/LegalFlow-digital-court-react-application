export const ZONE_TYPES = {
    PREMIUM: 'PREMIUM',
    ELECTRIC: 'ELECTRIC',
    ECONOMY: 'ECONOMY',
    DISABLED: 'DISABLED',
    VIP: 'VIP'
};

export const SLOT_STATUS = {
    AVAILABLE: 'AVAILABLE',
    OCCUPIED: 'OCCUPIED',
    RESERVED: 'RESERVED',
    MAINTENANCE: 'MAINTENANCE'
};

export const parkingSlots = [
    // Section A - Premium Zone
    ...Array(10).fill(null).map((_, index) => ({
        id: `A-${index + 1}`,
        slotNumber: `A${index + 1}`,
        zoneType: ZONE_TYPES.PREMIUM,
        floor: 1,
        section: 'A',
        status: Math.random() > 0.3 ? SLOT_STATUS.AVAILABLE : SLOT_STATUS.OCCUPIED,
        rate: 100,
        dimensions: { length: 20, width: 10 },
        features: ['CCTV', 'Charging Point', 'Covered']
    })),

    // Section B - Electric Vehicle Zone
    ...Array(15).fill(null).map((_, index) => ({
        id: `B-${index + 1}`,
        slotNumber: `B${index + 1}`,
        zoneType: ZONE_TYPES.ELECTRIC,
        floor: 1,
        section: 'B',
        status: Math.random() > 0.4 ? SLOT_STATUS.AVAILABLE : SLOT_STATUS.OCCUPIED,
        rate: 80,
        dimensions: { length: 18, width: 9 },
        features: ['CCTV', 'Covered', 'EV Charging Station', 'Smart Meter', 'Fast Charging']
    })),

    // Section C - Economy Zone
    ...Array(20).fill(null).map((_, index) => ({
        id: `C-${index + 1}`,
        slotNumber: `C${index + 1}`,
        zoneType: ZONE_TYPES.ECONOMY,
        floor: 2,
        section: 'C',
        status: Math.random() > 0.2 ? SLOT_STATUS.AVAILABLE : SLOT_STATUS.OCCUPIED,
        rate: 40,
        dimensions: { length: 16, width: 8 },
        features: ['CCTV']
    })),

    // Section D - Disabled Access Zone
    ...Array(5).fill(null).map((_, index) => ({
        id: `D-${index + 1}`,
        slotNumber: `D${index + 1}`,
        zoneType: ZONE_TYPES.DISABLED,
        floor: 1,
        section: 'D',
        status: Math.random() > 0.6 ? SLOT_STATUS.AVAILABLE : SLOT_STATUS.OCCUPIED,
        rate: 40,
        dimensions: { length: 22, width: 12 },
        features: ['CCTV', 'Wheelchair Access', 'Covered']
    })),

    // Section E - VIP Zone
    ...Array(8).fill(null).map((_, index) => ({
        id: `E-${index + 1}`,
        slotNumber: `E${index + 1}`,
        zoneType: ZONE_TYPES.VIP,
        floor: 1,
        section: 'E',
        status: Math.random() > 0.5 ? SLOT_STATUS.AVAILABLE : SLOT_STATUS.RESERVED,
        rate: 150,
        dimensions: { length: 22, width: 11 },
        features: ['CCTV', 'Charging Point', 'Covered', 'Valet Service', '24/7 Security']
    }))
];

export const zoneColors = {
    [ZONE_TYPES.PREMIUM]: '#FF6B6B',  // Coral Red
    [ZONE_TYPES.ELECTRIC]: '#27AE60', // Electric Green
    [ZONE_TYPES.ECONOMY]: '#95A5A6',  // Gray
    [ZONE_TYPES.DISABLED]: '#3498DB', // Blue
    [ZONE_TYPES.VIP]: '#F1C40F'      // Gold
};

export const statusColors = {
    [SLOT_STATUS.AVAILABLE]: '#2ECC71',   // Green
    [SLOT_STATUS.OCCUPIED]: '#E74C3C',    // Red
    [SLOT_STATUS.RESERVED]: '#F39C12',    // Orange
    [SLOT_STATUS.MAINTENANCE]: '#95A5A6'   // Gray
};
