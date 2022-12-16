import React, {useState} from 'react';
import {Col} from 'reactstrap';
import CreateButton from "../utilities/CreateButton";
import StepColumCard from "./StepColumnCard";

const StepsContainer = () => {
    const [steps, setSteps] = useState([])

    const createStep = () => {
        setSteps([...steps, {id:String(steps.length + 1)}])
    }
    return (
        <>
            {steps.map((step, index) => (
                <Col key={step.id} className='flex-shrink-0'>
                    <StepColumCard index={index} amount={steps.length} stepName={'Step No. ' + (index + 1)} />
                </Col>
            ))}
            <Col className='flex-shrink-0'>
                <CreateButton label='New Step' type='step' onClick={createStep}/>
            </Col>
        </>
    );
};

export default StepsContainer;
