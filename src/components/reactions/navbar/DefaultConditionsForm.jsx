import React, { useState } from 'react'
import FormButtons from "../../utilities/FormButtons";

import ConditionTypeFormGroup from '../../activities/forms/conditions/ConditionTypeFormGroup';

import { conditionFormTypeNames } from '../../../constants/conditionTypes';

import { useReactionsFetcher } from '../../../fetchers/ReactionsFetcher'


const DefaultConditionsForm = ({ defaultConditions, conditionEquipmentOptions, closeForm }) => {

  const api = useReactionsFetcher();

  const [defaultConditionsForm, updateDefaultConditionsForm] = useState(defaultConditions)
  const [openSubFormLabel, setOpenSubFormLabel] = useState(undefined)

  const handleWorkupChange = (field) => {
    const { name, value } = field;
    updateDefaultConditionsForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleSave = () => {
    api.updateDefaultConditions(defaultConditionsForm)
    closeForm()
  }

  const handleToggleSubform = (openSubformLabel) => {
    setOpenSubFormLabel(openSubformLabel)
  }

  const anySubFormOpen = () => {
    console.log("any subform open")
    console.log(conditionEquipmentOptions)
    return openSubFormLabel !== undefined
  }

  return (
    <>
      {
        conditionFormTypeNames.map((conditionTypeName) => (
          <ConditionTypeFormGroup
            key={conditionTypeName}
            conditionTypeName={conditionTypeName}
            equipmentOptions={conditionEquipmentOptions[conditionTypeName]}
            preCondition={defaultConditions[conditionTypeName]}
            workup={defaultConditionsForm}
            openSubFormLabel={openSubFormLabel}
            onWorkupChange={handleWorkupChange}
            onToggleSubform={handleToggleSubform}
          />)
        )
      }
      <FormButtons onSave={handleSave} onCancel={closeForm} type='primary' disabled={anySubFormOpen()} />
    </>

  )
}

export default DefaultConditionsForm
