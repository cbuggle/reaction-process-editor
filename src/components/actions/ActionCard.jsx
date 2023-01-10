import React from 'react';
import ProcedureCard from "../utilities/ProcedureCard";

const ActionCard = (
  {
    title,
    children,
    onEdit,
    onDelete,
    onCancel,
    showForm = false,
  }) => {
  return (
    <ProcedureCard
      title={title}
      type='action'
      onEdit={onEdit}
      onDelete={onDelete}
      onCancel={onCancel}
      showEditBtn={!showForm}
      showMoveXBtn={false}
      showMoveYBtn={!showForm}
      showDeleteBtn={!showForm}
      showCancelBtn={showForm}
    >
      {children}
    </ProcedureCard>
  );
};

export default ActionCard;
