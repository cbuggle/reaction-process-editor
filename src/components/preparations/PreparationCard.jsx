import React from 'react';
import ProcedureCard from "../utilities/ProcedureCard";

const PreparationCard = (props) => {
    return (
        <ProcedureCard {...props} type='preparation'>
            {props.children}
        </ProcedureCard>
    );
};

export default PreparationCard;
