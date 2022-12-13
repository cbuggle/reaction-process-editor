import React from 'react'

import SamplesCollapsible from './SamplesCollapsible'
import SamplesSelectBar from './SamplesSelectBar'

const SamplesSideBar = ({ reactionProcess }) => {
  return (
    <>
      <SamplesCollapsible name={"Additives"} actsAs={"ADDITIVE"} samples={reactionProcess.additives} />
      <SamplesCollapsible name={"Diverse Solvents"} actsAs={"DIVERSE_SOLVENT"} samples={reactionProcess.diverse_solvents} />
      <SamplesSelectBar reactionProcess={reactionProcess} />
    </>
  )
}

export default SamplesSideBar
