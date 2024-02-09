import React, { useState } from 'react';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreateButton from '../utilities/CreateButton';
import StepColumCard from "./StepColumnCard";

const StepsContainer = ({ reactionProcess }) => {

  const [displayNewStep, setDisplayNewStep] = useState(false)

  const toggleNewStep = () => {
    setDisplayNewStep(!displayNewStep)
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {reactionProcess.reaction_process_steps.map((processStep, index) => (
          <StepColumCard index={index}
           key={processStep.id}
            reactionProcess={reactionProcess}
            processStep={processStep}
            totalSteps={reactionProcess.reaction_process_steps.length}
          />
        ))}
        {displayNewStep ?
          <StepColumCard
            reactionProcess={reactionProcess}
            onCancel={toggleNewStep}
          />
          :
          <CreateButton label='New Step' type='step' onClick={toggleNewStep} />
        }
      </DndProvider>
    </>
  );
};


export default StepsContainer
