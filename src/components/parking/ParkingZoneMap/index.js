import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { All_SPOTS_DATA } from '../../../constants/PMS_CONSTANTS/ParkingSpots';
import { BsLightningChargeFill } from 'react-icons/bs';

const ParkingZoneMap = ({ 
  selectedFloor = 1,
  zoneRiskData = { 
    "ZoneA": "#ef4444",  // red
    "ZoneB": "#eab308",  // yellow
    "ZoneC": "#22c55e"   // green
  },
  onSpotClick 
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    console.log('selected spot', selectedSpot);
    if (!svgRef.current) return;
    d3.select(svgRef.current).selectAll("*").remove();

    const floorData = All_SPOTS_DATA.floors.find(f => f.floor === selectedFloor);
    if (!floorData) return;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const spotSize = 50;
    const spotsPerRow = Math.floor(width / spotSize);
 //   const rows = Math.ceil(floorData.spots.length / spotsPerRow);
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create parking spots
    const spots = svg.selectAll('.spot')
      .data(floorData.spots)
      .enter()
      .append('g')
      .attr('class', 'spot')
      .attr('transform', (d, i) => {
        const row = Math.floor(i / spotsPerRow);
        const col = i % spotsPerRow;
        return `translate(${col * spotSize},${row * spotSize})`;
      });

    // Add rectangles for spots
    spots.append('rect')
      .attr('width', spotSize - 2)
      .attr('height', spotSize - 2)
      .attr('rx', 4)
      .attr('fill', d => zoneRiskData[d.zone] || '#e5e7eb')
      .attr('stroke', d => d.isReserved ? '#1e3a8a' : 'none')
      .attr('stroke-width', d => d.isReserved ? 2 : 0)
      .attr('class', 'transition-colors duration-200 hover:opacity-80');

    // Add spot numbers
    spots.append('text')
      .attr('x', spotSize / 2)
      .attr('y', spotSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '10px')
      .text(d => d.spotNumber);

    // Add EV indicators
    spots.filter(d => d.isEV)
      .append('svg:foreignObject')
      .attr('width', 16)
      .attr('height', 16)
      .attr('x', spotSize - 18)
      .attr('y', 2)
      .html(() => {
        const div = document.createElement('div');
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="text-yellow-400"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/></svg>';
        return div.innerHTML;
      });

    // Add click handlers
    spots.on('click', (event, d) => {
      setSelectedSpot(d);
      onSpotClick?.(d);
    });

    // Add mouseover tooltip
    const tooltip = d3.select(tooltipRef.current);
    
    spots.on('mouseover', (event, d) => {
      tooltip
        .style('display', 'block')
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY + 10}px`)
        .html(`
          <div class="p-2">
            <div>Spot: ${d.spotNumber}</div>
            <div>Zone: ${d.zone}</div>
            ${d.isReserved ? '<div>Reserved</div>' : ''}
            ${d.isEV ? '<div>EV Charging</div>' : ''}
          </div>
        `);
    })
    .on('mouseout', () => {
      tooltip.style('display', 'none');
    });

  }, [selectedFloor, zoneRiskData, onSpotClick]);

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-2">Zone Risk Levels</h3>
        {Object.entries(zoneRiskData).map(([zone, color]) => (
          <div key={zone} className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
            <span>{zone}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <BsLightningChargeFill className="text-yellow-400" />
          <span>EV Charging</span>
        </div>
      </div>

      {/* Main visualization */}
      <svg ref={svgRef} className="w-full h-auto" />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="hidden absolute bg-white p-2 rounded-lg shadow-lg text-sm pointer-events-none"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
};

export default ParkingZoneMap;
