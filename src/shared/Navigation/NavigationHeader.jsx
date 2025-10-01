import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import { RiArrowGoBackLine } from 'react-icons/ri';

const NavigationHeader = ({ currentStep }) => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: 'Driver Details', path: '/new-registration' },
    { id: 2, name: 'Ticket Management', path: '/ticket-management' },
    { id: 3, name: 'Vehicle Monitoring', path: '/vehicle-monitoring' }
  ];

  const currentIndex = steps.findIndex(step => step.name === currentStep);
  const prevStep = steps[currentIndex - 1];
  const nextStep = steps[currentIndex + 1];

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (prevStep) {
      navigate(prevStep.path);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {prevStep && (
          <button
            onClick={() => navigate(prevStep.path)}
            onContextMenu={handleContextMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RiArrowGoBackLine className="text-xl" />
            <span>Back to {prevStep.name}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={`h-2 w-2 rounded-full ${
                  index <= currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-8 ${
                    index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {nextStep && (
          <button
            onClick={() => navigate(nextStep.path)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Next: {nextStep.name}</span>
            <IoArrowForward className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationHeader;
