import React from 'react'

import SamplesDecorator from '../samples/SamplesDecorator'

// import ActionStartStopTimer from './ActionStartStopTimer'

const prettyMilliseconds = require('pretty-ms');

const ActionInfo = ({ action }) => {

  return (
    <>
      <div align="left">{action.position + 1} {action.action_name} {action.workup['description']}</div>
      {action.workup['acts_as'] === "SAMPLE" ? SamplesDecorator.sampleSvgFile(action.sample) : <></>}
    </>
  )
}

export default ActionInfo
