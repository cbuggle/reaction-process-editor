import React from 'react'

import SamplesDecorator from '../samples/SamplesDecorator'

// import ActionStartStopTimer from './ActionStartStopTimer'

const prettyMilliseconds = require('pretty-ms');

const ActivityInfo = ({ action }) => {

  return (
    <>
      {action.workup['acts_as'] === "SAMPLE" ? SamplesDecorator.sampleSvgFile(action.sample) : <></>}
      <div><strong>{action.label}</strong></div>
    </>
  )
}

export default ActivityInfo
