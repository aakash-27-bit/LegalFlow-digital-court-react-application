import React from 'react';
import styles from '../styles/ParkingZoneMap.css';

const ParkingTooltip = ({ content, position }) => {
  if (!content) return null;

  const tooltipStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div className={styles.tooltip} style={tooltipStyle}>
      {content}
    </div>
  );
};

export default ParkingTooltip;
