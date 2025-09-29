import React from 'react';
import styles from '../styles/ParkingSlotCell.css';
import { getSlotScaleState, getSlotAriaLabel } from '../utils/slotScaler';

const ParkingSlotCell = ({
  slotData,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive,
}) => {
  const {
    id,
    number,
    status,
    features = [],
  } = slotData;

  const slotState = getSlotScaleState(status);
  const ariaLabel = getSlotAriaLabel(slotData);

  return (
    <div
      className={`${styles['parking-slot']} ${isActive ? styles['parking-slot--active'] : ''} ${
        styles[`bg-slot-${slotState}`]
      }`}
      onClick={() => onClick(slotData)}
      onMouseEnter={(e) => onMouseEnter(e, slotData)}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <div className={styles['slot-content']}>
        <div className={styles['slot-header']}>
          <span className={styles['text-slot-text']}>Slot</span>
          <span className={styles['text-slot-text']}>{id}</span>
        </div>
        <div className={styles['slot-info']}>
          <span className={styles['slot-number']}>{number}</span>
          {features.length > 0 && (
            <ul className={styles['features-list']}>
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingSlotCell;
