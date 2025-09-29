import React, { useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import styles from './styles/ParkingZoneMap.css';
import ParkingSlotCell from './components/ParkingSlotCell';
import ParkingLegend from './components/ParkingLegend';
import ParkingTooltip from './components/ParkingTooltip';
import ZoomControls from './components/ZoomControls';

const ZOOM_EXTENT = [1, 3];
const TRANSITION_DURATION = 300;

const ParkingZoneMap = ({ slots = [], onSlotClick, isLoading }) => {
  const svgRef = useRef(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState(d3.zoomIdentity);

  const legendItems = [
    { label: 'Available', color: '#9ECAD6' },
    { label: 'Occupied', color: '#FFEAEA' },
  ];

  const handleZoom = useCallback((event) => {
    setTransform(event.transform);
  }, []);

  const initializeZoom = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom()
      .scaleExtent(ZOOM_EXTENT)
      .on('zoom', handleZoom);

    svg.call(zoom);
    return zoom;
  }, [handleZoom]);

  const handleZoomIn = useCallback(() => {
    const zoom = initializeZoom();
    const svg = d3.select(svgRef.current);
    svg.transition()
      .duration(TRANSITION_DURATION)
      .call(zoom.scaleBy, 1.2);
  }, [initializeZoom]);

  const handleZoomOut = useCallback(() => {
    const zoom = initializeZoom();
    const svg = d3.select(svgRef.current);
    svg.transition()
      .duration(TRANSITION_DURATION)
      .call(zoom.scaleBy, 0.8);
  }, [initializeZoom]);

  const handleZoomReset = useCallback(() => {
    const zoom = initializeZoom();
    const svg = d3.select(svgRef.current);
    svg.transition()
      .duration(TRANSITION_DURATION)
      .call(zoom.transform, d3.zoomIdentity);
  }, [initializeZoom]);

  const handleSlotClick = useCallback((slot) => {
    setActiveSlot(slot.id === activeSlot?.id ? null : slot);
    if (onSlotClick) {
      onSlotClick(slot);
    }
  }, [activeSlot, onSlotClick]);

  const handleMouseEnter = useCallback((event, slot) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipContent(slot.tooltipContent);
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipContent(null);
  }, []);

  return (
    <div className={styles['map-container']}>
      <svg
        ref={svgRef}
        className={styles['map-svg']}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={transform}>
          {slots.map((slot) => (
            <ParkingSlotCell
              key={slot.id}
              slotData={slot}
              onClick={handleSlotClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isActive={slot.id === activeSlot?.id}
            />
          ))}
        </g>
      </svg>

      <ParkingLegend legendItems={legendItems} />
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleZoomReset}
      />
      <ParkingTooltip
        content={tooltipContent}
        position={tooltipPosition}
      />

      {isLoading && (
        <div className={styles['loading-overlay']}>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ParkingZoneMap;
