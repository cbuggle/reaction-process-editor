import React from 'react'
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import Preparation from "./Preparation";
import Dummy from "../utilities/Dummy";

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
    <ColumnContainerCard
      title='Preparations'
      type='preparation'
      showEditBtn={false}
      showMoveXBtn={false}
      showDeleteBtn={false}
      showCancelBtn={false}
    >
      <Dummy.Details>
        {renderSamplePreparations()}
        <Preparation reactionProcess={reactionProcess} onChange={onChange} />
      </Dummy.Details>
    </ColumnContainerCard>
  )
}

export default PreparationColumnCard
