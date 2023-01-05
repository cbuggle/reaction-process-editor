import React from 'react';
import ProcedureCard from "../utilities/ProcedureCard";

const PreparationCard = (
  {
    title,
    children,
    onEdit,
    onDelete,
    showForm = false,
  }) => {
  return (
    <ProcedureCard
      title={title}
      type='preparation'
      onEdit={onEdit}
      onDelete={onDelete}
      showEditBtn={!showForm}
      showMoveXBtn={false}
      showMoveYBtn={!showForm}
      showDeleteBtn={true}
      showCancelBtn={false}
    >
      {children}
    </ProcedureCard>
  );
};

export default PreparationCard;
