import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FilamentGauge = ({ filament_total, filament_curr }) => {
  const percentage = (filament_curr / filament_total) * 100;

  return (
    <div className="flex items-center justify-center" style={{ width: '100px', height: '100px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: 'hsl(207, 70%, 50%)', // Blue color
          textColor: 'hsl(207, 70%, 50%)',
          trailColor: 'hsl(207, 70%, 90%)', // Light blue color for the trail
          textSize: '14px', // Smaller text size
        })}
      />
    </div>
  );
};

export default FilamentGauge;
