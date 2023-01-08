import React from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import CreateButton from "../utilities/CreateButton";
import Action from '../actions/Action';

import StepEquipment from './header/StepEquipment'
import StepSamples from './header/StepSamples'
import StepVessel from './header/StepVessel'
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const StepColumCard = ({ processStep, index, totalSteps, onChange }) => {

  const titlePrefix = (index + 1) + '/' + totalSteps

  const renderTitle = () => {
    return (titlePrefix + ' ' + processStep.name)
  }

  const api = useReactionsFetcher()

  const confirmDeleteStep = () => {

    window.confirm('Deleting the ProcessStep will irreversably delete this ' +
      'step and all associated actions. This can not be undone. Are you sure?')
      && deleteStep()
  }

  const deleteStep = () => {
    api.deleteProcessStep(processStep.id).then(() => {
      onChange()
    })
  }

  return (
    <ColumnContainerCard title={renderTitle()} type='step' onDelete={confirmDeleteStep}>
      <StepVessel processStep={processStep} />
      <StepSamples processStep={processStep} />
      <StepEquipment processStep={processStep} />
      {processStep.actions.map(action => (
        <Action key={action.id} action={action} processStep={processStep} onChange={onChange} />
      ))}

      <Action action={{ workup: {} }} processStep={processStep} onChange={onChange} />
    </ColumnContainerCard>
  );
};

export default StepColumCard;
