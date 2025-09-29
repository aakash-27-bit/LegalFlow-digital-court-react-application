import React from 'react';
import styles from '../styles/ParkingZoneMap.css';

const ParkingLegend = ({ legendItems }) => {
  return (
    <div className={styles.legend}>
      <div className={styles['legend-title']}>Parking Status</div>
      {legendItems.map((item) => (
        <div key={item.label} className={styles['legend-item']}>
          <div
            className={styles['legend-color']}
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ParkingLegend;
