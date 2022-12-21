import React from 'react'
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import SamplePreparationForm from './SamplePreparationForm'

const SamplePreparationsBar = ({ reactionProcess, onChange }) => {

  const renderSamplePreparations = () => {
    return (
      <>
        {reactionProcess.samples_preparations.map((preparation, idx) => (
          <SamplePreparationForm key={idx} preparation={preparation} reactionProcess={reactionProcess} onChange={onChange} />
        ))}
      </>
    )
  }

  return (
    <ColumnContainerCard title='Preparations' minWidth='424'>
        {renderSamplePreparations()}
        <SamplePreparationForm reactionProcess={reactionProcess} onChange={onChange} />
    </ColumnContainerCard>
  )
}

export default SamplePreparationsBar
