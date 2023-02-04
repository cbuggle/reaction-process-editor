import React, {useEffect, useState} from 'react';

const ConditionBeamsImage = ({width, height, beamsObject}) => {
  const extractBeams = () => {
    return Object.keys(beamsObject).map((key) => beamsObject[key])
  }
  const [beams, setBeams] = useState(extractBeams())
  useEffect(() => {
    setBeams(extractBeams())
  }, [beamsObject]);
  return (
    <svg width={width} height={height} viewBox={'0 0 ' + width + ' ' + height} className='condition-beams-image'>
      {beams.map((beam, index) => (
        <rect
          id={'beam-' + beam.activityNumber}
          key={index}
          x={width - (beam.level * 20) - 6}
          y={beam.startY}
          className='condition-beam'
          width='6'
          height={beam.height}
        />))
      }
    </svg>
  );
};

export default ConditionBeamsImage;
