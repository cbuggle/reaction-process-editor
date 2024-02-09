import React from 'react'

import ColumnContainerCard from "../utilities/ColumnContainerCard";
import Preparation from "./Preparation";
import ProcedureCard from "../utilities/ProcedureCard";

const PreparationColumnCard = ({ reactionProcess }) => {

  const renderSamplePreparations = () => {
    return (
      <>
        {reactionProcess.samples_preparations.map((preparation, idx) => (
          <Preparation key={idx} preparation={preparation} reactionProcessId={reactionProcess.id} />
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
      <ProcedureCard.Details>
        {renderSamplePreparations()}
        <Preparation reactionProcessId={reactionProcess.id} />
      </ProcedureCard.Details>
    </ColumnContainerCard>
  )
}

export default PreparationColumnCard
