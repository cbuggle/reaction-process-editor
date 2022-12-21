import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";

const PreparationCard = ({title, children}) => {
    return (
        <Card>
            <CardHeader>
                {title}
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
};

export default PreparationCard;
