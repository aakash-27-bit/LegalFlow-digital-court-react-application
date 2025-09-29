/**
 * Returns the appropriate class names for slot scaling based on active state
 * @param {boolean} isActive - Whether the slot is currently active/expanded
 * @returns {object} Object containing class names and transform values
 */
export const getSlotScaleState = (isActive) => ({
  container: `parking-slot ${isActive ? 'parking-slot--active' : ''}`,
  dimensions: isActive ? 'w-64' : 'w-20 h-20',
  background: isActive ? 'bg-slot-active text-slot-text' : 'bg-slot-inactive text-white',
  transform: 'transition-transform duration-300 ease-in-out hover:scale-102.5',
  interaction: 'cursor-pointer rounded-xl shadow-md p-2'
});

/**
 * Generates aria label for parking slot
 * @param {object} slot - Slot data object
 * @returns {string} Accessibility label for the slot
 */
export const getSlotAriaLabel = (slot) => {
  const status = slot.status === 'AVAILABLE' ? 'available' : 'occupied';
  return `Parking slot ${slot.slotNumber}, ${status}, ${slot.zoneType} zone, floor ${slot.floor}`;
};
