const floors = [];
const zones = ["ZoneA", "ZoneB", "ZoneC"];
const security = ["Rajesh Kumar (KN100)", "Meena Sharma (KN101)", "Anil Verma (KN102)", "Priya Nair (KN103)", "Sandeep Joshi (KN104)"];

for (let f = 1; f <= 5; f++) {
  const spots = [];
  for (let i = 1; i <= 100; i++) {
    spots.push({
      spotNumber: `F${f}-${String.fromCharCode(64 + f)}${String(i).padStart(2, '0')}`,
      zone: zones[i % zones.length],
      isReserved: i % 3 === 0,
      driverId: i % 3 === 0 ? `D${f}${i}` : null,
      vehicleId: i % 3 === 0 ? `V${f}${i}` : null,
      isEV: i % 5 === 0
    });
  }
  floors.push({
    floor: f,
    securityIncharge: security[f - 1],
    spots
  });
}

export const All_SPOTS_DATA = { floors };
