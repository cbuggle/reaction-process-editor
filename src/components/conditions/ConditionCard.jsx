import React from 'react';
import ProcedureCard from "../utilities/ProcedureCard";

const ConditionCard = (
  {
    title,
    children,
    onEdit,
    onDelete,
    onCancel,
    showForm = false,
    dragRef
  }) => {
  return (
    <ProcedureCard
      title={title}
      type='condition'
      onEdit={onEdit}
      onDelete={onDelete}
      onCancel={onCancel}
      showEditBtn={!showForm}
      showMoveXBtn={false}
      showMoveYBtn={!showForm}
      showDeleteBtn={!showForm}
      showCancelBtn={showForm}
      dragRef={dragRef}
    >
      {children}
    </ProcedureCard>
  );
};

export default ConditionCard;
