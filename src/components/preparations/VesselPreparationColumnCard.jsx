import React from 'react'

import ProcedureCard from "../utilities/ProcedureCard";

import VesselPreparationForm from './VesselPreparationForm.jsx';

const VesselPreparationColumnCard = ({ reactionProcess }) => {

  const renderVesselPreparations = () => {
    return (
      <>
        {reactionProcess.reaction_process_vessels.map((reaction_process_vessel, idx) => (
          <VesselPreparationForm key={idx} reactionProcessVessel={reaction_process_vessel} />
        ))}
      </>
    )
  }

  return (
    <ProcedureCard
      title='Vessels'
      type='preparation'
      showEditBtn={false}
      showMoveXBtn={false}
      showDeleteBtn={false}
      showCancelBtn={false}
      showMoveYBtn={false}
      customClass='procedure-card--column'
    >
      <ProcedureCard.Details>
        {renderVesselPreparations()}
      </ProcedureCard.Details>
    </ProcedureCard>
  )
}

export default VesselPreparationColumnCard
