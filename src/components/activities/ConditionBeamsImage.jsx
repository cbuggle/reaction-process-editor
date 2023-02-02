import React from 'react';

const ConditionBeamsImage = ({width, height, beams}) => {
  return (
    <svg width={width} height={height} viewBox={'0 0 ' + width + ' ' + height} className='condition-beams-image'>
      <rect x='16' y='40' className='condition-beam' width='4' height='400'/>
      <rect x='36' y='80' className='condition-beam' width='4' height='400'/>
    </svg>
  );
};

export default ConditionBeamsImage;
