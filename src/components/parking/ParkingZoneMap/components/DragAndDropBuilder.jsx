import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  AREA: 'area',
  HEATMAP: 'heatmap'
};

const DraggableChartComponent = ({ type, data, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'chart',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="p-4 border rounded-lg shadow-sm cursor-move bg-white"
    >
      {type} Chart
    </div>
  );
};

const DroppableArea = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chart',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[400px] border-2 border-dashed rounded-lg p-4 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {children || <div className="text-center text-gray-500">Drop charts here</div>}
    </div>
  );
};

const DragAndDropBuilder = ({ data }) => {
  const [charts, setCharts] = useState([]);

  const handleDrop = useCallback((item) => {
    setCharts((prev) => [...prev, item]);
  }, []);

  const renderChart = (chartType, data) => {
    const chartData = {
      labels: data.labels,
      datasets: [{
        label: 'Parking Data',
        data: data.values,
        fill: chartType === CHART_TYPES.AREA,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    if (chartType === CHART_TYPES.HEATMAP) {
      return (
        <div className="h-64 w-full bg-gradient-to-r from-blue-500 to-red-500">
          Heatmap Visualization
        </div>
      );
    }

    return (
      <Chart
        type={chartType === CHART_TYPES.AREA ? 'line' : chartType}
        data={chartData}
        options={options}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 p-4 bg-gray-100 rounded-lg overflow-x-auto">
          {Object.values(CHART_TYPES).map((type) => (
            <DraggableChartComponent key={type} type={type} />
          ))}
        </div>

        <DroppableArea onDrop={handleDrop}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {charts.map((chart, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                {renderChart(chart.type, data)}
              </div>
            ))}
          </div>
        </DroppableArea>
      </div>
    </DndProvider>
  );
};

export default DragAndDropBuilder;
