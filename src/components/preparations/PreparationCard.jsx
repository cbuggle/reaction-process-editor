import React from "react";
import ProcedureCard from "../utilities/ProcedureCard";

const PreparationCard = ({
  title,
  children,
  onEdit,
  onDelete,
  onCancel,
  allowDelete = true,
  showForm = false,
}) => {
  return (
    <ProcedureCard
      title={title}
      type="preparation"
      onEdit={onEdit}
      onDelete={onDelete}
      onCancel={onCancel}
      showEditBtn={!showForm}
      showMoveBtn={false}
      showDeleteBtn={allowDelete ? !showForm : false}
      showCancelBtn={showForm}
      displayMode={showForm ? "form" : "info"}
    >
      {children}
    </ProcedureCard>
  );
};

export default PreparationCard;
