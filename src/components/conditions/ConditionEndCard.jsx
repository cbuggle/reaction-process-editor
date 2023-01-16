import React from 'react';
import ProcedureCard from "../utilities/ProcedureCard";

const ConditionEndCard = (
  {
    title,
    children,
    dragRef
  }) => {
  return (
    <ProcedureCard
      title={title}
      type='condition'
      showEditBtn={false}
      showMoveXBtn={false}
      showMoveYBtn={true}
      showDeleteBtn={false}
      showCancelBtn={false}
      dragRef={dragRef}
    >
      {children}
    </ProcedureCard>
  );
};

export default ConditionEndCard;
