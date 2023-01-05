import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import ProcedureCard from "./ProcedureCard";

const ColumnContainerCard = ({ title, children, type, onEdit, onDelete, showForm }) => {
    return (
        <ProcedureCard
          title={title}
          customClass={'column-container-card column-container-card--' + type}
          type={type}
          children={children}
          headerTitleTag='h3'
          onEdit={onEdit}
          onDelete={onDelete}
          showEditBtn={!showForm}
          showMoveXBtn={!showForm}
          showMoveYBtn={false}
          showDeleteBtn={true}
          showCancelBtn={false}
        />
    )
}

export default ColumnContainerCard
