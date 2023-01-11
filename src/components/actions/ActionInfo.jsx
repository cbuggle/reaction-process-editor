import React from 'react'

import SamplesDecorator from '../samples/SamplesDecorator'

// import ActionStartStopTimer from './ActionStartStopTimer'

const prettyMilliseconds = require('pretty-ms');

const ActionInfo = ({ action }) => {

  return (
    <>
      <div align="left">{action.label}</div>
      {action.workup['acts_as'] === "SAMPLE" ? SamplesDecorator.sampleSvgFile(action.sample) : <></>}
    </>
  )
}

export default ActionInfo
