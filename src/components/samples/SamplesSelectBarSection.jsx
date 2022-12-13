import React from 'react'

import SamplesSelectBarSample from './SamplesSelectBarSample'

const SamplesSelectBarSection = ({ section }) => {
  return (
    <>
      <div className="samples-select-bar-section">
        {section.name} ({section.samples.length})

        {section.samples.map((sample, idx) => (
          <SamplesSelectBarSample key={idx} sample={sample} layout={section.layout} />
        ))}
      </div>
    </>
  )
}

export default SamplesSelectBarSection
