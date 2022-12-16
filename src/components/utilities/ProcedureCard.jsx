import React from 'react';
import {Card, CardBody, CardHeader, ButtonGroup, Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProcedureCard = (
    {
        title,
        type,
        mode,
        children,
        onEdit,
        onDelete,
        onCancel,
        showEditBtn = true,
        showMoveXBtn = true,
        showMoveYBtn = true,
        showDeleteBtn= true,
        showCancelBtn = true,
    }) => {
        return (
            <Card className={'procedure-card procedure-card--' + type}>
                <CardHeader className='d-flex justify-content-between'>
                    <span>{title}</span>
                    <ButtonGroup>
                        {showEditBtn &&
                            <Button size="sm" onClick={onEdit}>
                                <FontAwesomeIcon size="lg" icon='pen' />
                            </Button>
                        }
                        {showMoveXBtn &&
                            <Button size="sm">
                                <FontAwesomeIcon size="lg" icon='arrow-left-arrow-right' />
                            </Button>
                        }
                        {showMoveYBtn &&
                            <Button size="sm">
                                <FontAwesomeIcon size="lg" icon='arrow-down-arrow-up' />
                            </Button>
                        }
                        {showDeleteBtn &&
                            <Button size="sm" onClick={onDelete}>
                                <FontAwesomeIcon size="lg" icon='trash' />
                            </Button>
                        }
                        {showCancelBtn &&
                            <Button size="sm" onClick={onCancel}>
                                <FontAwesomeIcon size="lg" icon='xmark' />
                            </Button>
                        }
                    </ButtonGroup>
                </CardHeader>
                <CardBody className={'procedure-card__body procedure-card__body--' + mode}>
                    {children}
                </CardBody>
            </Card>
        );
};

export default ProcedureCard;
