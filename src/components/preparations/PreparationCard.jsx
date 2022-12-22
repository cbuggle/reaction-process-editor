import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import ProcedureCard from "../utilities/ProcedureCard";

const PreparationCard = ({title, children}) => {
    return (
        <ProcedureCard title={title} type='preparation'>
            {children}
        </ProcedureCard>
    );
};

export default PreparationCard;
