import React from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import CreateButton from "../utilities/CreateButton";
import ActionCard from "../actions/ActionCard";

import StepEquipment from './header/StepEquipment'
import StepSamples from './header/StepSamples'
import StepVessel from './header/StepVessel'
import StepDeleteButton from "./StepDeleteButton";

const StepColumCard = ({ processStep, index, totalSteps, onChange }) => {

  const stepName = 'Step No. ' + (index + 1)
  const title = (index + 1) + '/' + totalSteps + ' ' + stepName // + ' ' + processStep.name

  const renderTitle = () => {
    return (
      <>
        <div>{title} {processStep.name}</div>
        <StepDeleteButton processStep={processStep} onDelete={onChange} />
      </>
    )
  }

  const createAction = () => { }

  return (
    <ColumnContainerCard title={renderTitle()} className='column-container-card column-container-card--step'>
      <StepVessel processStep={processStep} />
      <StepSamples processStep={processStep} />
      <StepEquipment processStep={processStep} />
      {processStep.actions.map(action => (
        <ActionCard key={action.id}>{action.id}</ActionCard>
      ))}
      <CreateButton label='New Action' type='action' onClick={createAction} />
    </ColumnContainerCard>
  );
};

export default StepColumCard;
