import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';

const ColumnContainerCard = ({ title, children }) => {
    return (
        <Card>
            <CardHeader>
                <h3>{title}</h3>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    )
}

export default ColumnContainerCard
