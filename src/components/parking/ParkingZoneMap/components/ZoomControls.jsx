import React from 'react';
import styles from '../styles/ParkingZoneMap.css';

const ZoomControls = ({ onZoomIn, onZoomOut, onReset }) => {
  return (
    <div className={styles['zoom-controls']}>
      <button
        className={styles['control-button']}
        onClick={onZoomIn}
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        className={styles['control-button']}
        onClick={onZoomOut}
        aria-label="Zoom out"
      >
        -
      </button>
      <button
        className={styles['control-button']}
        onClick={onReset}
        aria-label="Reset zoom"
      >
        ↺
      </button>
    </div>
  );
};

export default ZoomControls;