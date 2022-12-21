import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';

const ColumnContainerCard = ({ title, children, className }) => {
    return (
        <Card className={className}>
            <CardHeader>
                <h3>{title}</h3>
            </CardHeader>
            <CardBody className='column-container-card__body'>
                {children}
            </CardBody>
        </Card>
    )
}

export default ColumnContainerCard
