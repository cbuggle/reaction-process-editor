import React from 'react'

import ProcedureCard from "../utilities/ProcedureCard";
import SamplePreparation from "./SamplePreparation";

const PreparationColumnCard = ({ reactionProcess }) => {

  const renderSamplePreparations = () => {
    return (
      <>
        {reactionProcess.samples_preparations.map((preparation, idx) => (
          <SamplePreparation key={idx} preparation={preparation} reactionProcessId={reactionProcess.id} />
        ))}
      </>
    )
  }

  return (
    <ProcedureCard
      title='Samples'
      type='preparation'
      showEditBtn={false}
      showMoveXBtn={false}
      showDeleteBtn={false}
      showCancelBtn={false}
      showMoveYBtn={false}
      customClass='procedure-card--column'
    >
      <ProcedureCard.Details>
        {renderSamplePreparations()}
        <SamplePreparation reactionProcessId={reactionProcess.id} />
      </ProcedureCard.Details>
    </ProcedureCard>
  )
}

export default PreparationColumnCard
