import React from 'react';
import {Card} from "reactstrap";

const PreparationCard = ({children}) => {
    return (
        <Card>
            Preparation No. {children}
        </Card>
    );
};

export default PreparationCard;
