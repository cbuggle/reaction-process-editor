import React from 'react';

const ConditionBeamsImage = ({width, height, beams}) => {
  return (
    <svg width={width} height={height} viewBox={'0 0 ' + width + ' ' + height} className='condition-beams-image'>
      { Object.entries(beams).map((pair,key) =>
        <rect
          key={key}
          x={width - (pair[1].level * 20) - 6}
          y={pair[1].startY}
          className='condition-beam'
          width='6'
          height={pair[1].height}
        />)
      }
    </svg>
  );
};

export default ConditionBeamsImage;
