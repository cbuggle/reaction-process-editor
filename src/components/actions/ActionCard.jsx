import React from 'react';
import {Card, CardHeader} from "reactstrap";

const ActionCard = ({children}) => {
    return (
        <Card>
            <CardHeader>
                Action No. {children}
            </CardHeader>
        </Card>
    );
};

export default ActionCard;
