import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../../shared/contexts/ThemeContext.new';
import * as d3 from 'd3';
import styles from './styles/ParkingZoneMap.css';
import ParkingSlotCell from './ParkingSlotCell';
import ParkingLegend from './components/ParkingLegend';
import ParkingTooltip from './components/ParkingTooltip';
import ZoomControls from './components/ZoomControls';

const ZOOM_EXTENT = [1, 3];
const TRANSITION_DURATION = 300;

const ParkingZoneMap = ({ slots = [], onSlotClick, isLoading }) => {
  //console.log('ParkingZoneMap slots:', slots); // Debug log
  const svgRef = useRef(null);
  const { isDarkMode } = useTheme();

  // Calculate grid layout
  const SLOT_WIDTH = 100;
  const SLOT_HEIGHT = 100;
  const SLOT_MARGIN = 10;
  const SLOTS_PER_ROW = Math.floor(800 / (SLOT_WIDTH + SLOT_MARGIN));

  // Position calculation function
  const calculatePosition = (index) => {
    const row = Math.floor(index / SLOTS_PER_ROW);
    const col = index % SLOTS_PER_ROW;
    return {
      x: col * (SLOT_WIDTH + SLOT_MARGIN),
      y: row * (SLOT_HEIGHT + SLOT_MARGIN)
    };
  };

  const themeColors = {
    available: isDarkMode ? '#4B5563' : '#9ECAD6',
    occupied: isDarkMode ? '#4A5568' : '#FFEAEA',
    text: isDarkMode ? '#E5E7EB' : '#748DAE',
    background: isDarkMode ? '#1F2937' : '#FFFFFF'
  };
  const [activeSlot, setActiveSlot] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState(d3.zoomIdentity);
  const legendItems = [
    { label: 'Available', color: themeColors.available },
    { label: 'Occupied', color: themeColors.occupied },
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

  useEffect(() => {
    initializeZoom();
  }, [initializeZoom]);

  // const handleZoomIn = useCallback(() => {
  //   const zoom = initializeZoom();
  //   const svg = d3.select(svgRef.current);
  //   svg.transition()
  //     .duration(TRANSITION_DURATION)
  //     .call(zoom.scaleBy, 1.2);
  // }, [initializeZoom]);

  // const handleZoomOut = useCallback(() => {
  //   const zoom = initializeZoom();
  //   const svg = d3.select(svgRef.current);
  //   svg.transition()
  //     .duration(TRANSITION_DURATION)
  //     .call(zoom.scaleBy, 0.8);
  // }, [initializeZoom]);

  // const handleZoomReset = useCallback(() => {
  //   const zoom = initializeZoom();
  //   const svg = d3.select(svgRef.current);
  //   svg.transition()
  //     .duration(TRANSITION_DURATION)
  //     .call(zoom.transform, d3.zoomIdentity);
  // }, [initializeZoom]);

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
      <div className="relative w-full h-full min-h-[600px] overflow-auto">
        <div className="absolute inset-0 grid grid-cols-4 gap-8 p-4">
          {slots.map((slot, index) => {
            // Debug log for each slot
            return (
              <div key={slot.id} className="transform-gpu">
                <ParkingSlotCell
                  slotData={slot}
                  onClick={handleSlotClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  isActive={slot.id === activeSlot?.id}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* <ParkingLegend legendItems={legendItems} />
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleZoomReset}
      />
      <ParkingTooltip
        content={tooltipContent}
        position={tooltipPosition}
      /> */}

      {isLoading && (
        <div className={styles['loading-overlay']}>
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ParkingZoneMap;
