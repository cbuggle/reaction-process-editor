import React from 'react'
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import Preparation from "./Preparation";

const PreparationColumnCard = ({ reactionProcess, onChange }) => {

  const renderSamplePreparations = () => {
    return (
      <>
        {reactionProcess.samples_preparations.map((preparation, idx) => (
          <Preparation key={idx} preparation={preparation} reactionProcess={reactionProcess} onChange={onChange} />
        ))}
      </>
    )
  }

  return (
    <ColumnContainerCard title='Preparations' type='preparation'>
      {renderSamplePreparations()}
      <Preparation reactionProcess={reactionProcess} onChange={onChange} />
    </ColumnContainerCard>
  )
}

export default PreparationColumnCard
