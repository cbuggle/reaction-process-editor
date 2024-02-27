import React from 'react'

import ColumnContainerCard from "../utilities/ColumnContainerCard";
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
    <ColumnContainerCard
      title='Vessel Preparations'
      type='preparation'
      showEditBtn={false}
      showMoveXBtn={false}
      showDeleteBtn={false}
      showCancelBtn={false}
    >
      <ProcedureCard.Details>
        {renderVesselPreparations()}
      </ProcedureCard.Details>
    </ColumnContainerCard>
  )
}

export default VesselPreparationColumnCard
