import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import IconButton from "./IconButton";

const ProcedureCard = (
  {
    title,
    type,
    mode,
    children,
    onEdit,
    onDelete,
    onCancel,
    customClass = '',
    headerTitleTag = 'h5',
    showEditBtn = true,
    showMoveXBtn = true,
    showMoveYBtn = true,
    showDeleteBtn = true,
    showCancelBtn = true,
    dragRef
  }) => {
    const HeaderTitleTag = headerTitleTag
    return (
      <Card className={'procedure-card procedure-card--' + type + ' ' + customClass}>
        <CardHeader className={'d-flex justify-content-between align-items-center bg-' + type}>
          <HeaderTitleTag className='rounded-pill bg-white mb-0 px-3'>{title}</HeaderTitleTag>
          <div>
            {showEditBtn &&
              <IconButton onClick={onEdit} icon='pen' />
            }
            {showMoveXBtn &&
              <IconButton icon='arrows-alt-h' dragRef={dragRef} />
            }
            {showMoveYBtn &&
              <IconButton icon='arrows-alt-v' dragRef={dragRef} />
            }
            {showDeleteBtn &&
              <IconButton onClick={onDelete} icon='trash' />
            }
            {showCancelBtn &&
              <IconButton onClick={onCancel} icon='times' />
            }
          </div>
        </CardHeader>
        <CardBody className={'procedure-card__body procedure-card__body--' + mode}>
          {children}
        </CardBody>
      </Card>
    );
};

export default ProcedureCard;
