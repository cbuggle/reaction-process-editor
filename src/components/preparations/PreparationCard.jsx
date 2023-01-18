import React from 'react';
import Dummy from "../utilities/Dummy";

const PreparationCard = (
  {
    title,
    children,
    onEdit,
    onDelete,
    onCancel,
    showForm = false,
  }) => {
  return (
    <Dummy
      title={title}
      type='preparation'
      onEdit={onEdit}
      onDelete={onDelete}
      onCancel={onCancel}
      showEditBtn={!showForm}
      showMoveXBtn={false}
      showMoveYBtn={!showForm}
      showDeleteBtn={!showForm}
      showCancelBtn={showForm}
      displayMode={showForm ? 'form' : 'info'}
    >
      {children}
    </Dummy>
  );
};

export default PreparationCard;
