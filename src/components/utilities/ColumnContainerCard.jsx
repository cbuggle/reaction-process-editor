import React from 'react';
import ProcedureCard from "./ProcedureCard";

const ColumnContainerCard = (props) => {
  return (
    <ProcedureCard
      customClass={'column-container-card column-container-card--' + props.type}
      headerTitleTag={'h4'}
      showMoveYBtn={false}
      {...props}
    />
  )
}

export default ColumnContainerCard
