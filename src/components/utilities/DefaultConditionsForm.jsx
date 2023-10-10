import React, { useState } from 'react'
import { Form } from 'reactstrap';

import ConditionTypeFormGroup from '../activities/forms/conditions/ConditionTypeFormGroup';
import FormButtons from "../utilities/FormButtons";

import { conditionFormTypeNames } from '../../constants/conditionTypes';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'


const DefaultConditionsForm = (
  {
    defaultConditions,
    preConditions,
    conditionEquipmentOptions,
    closeForm,
    scope
  }) => {

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
    switch (scope) {
      case 'User':
        api.updateUserDefaultConditions(defaultConditionsForm).then(() => {
          window.dispatchEvent(new Event("userDefaultConditionsRequiresReload"))
        });
        break;
      case 'Reaction':
        api.updateReactionDefaultConditions(defaultConditionsForm)
        break;
      default:
        break;
    }
    closeForm()
  }

  const handleToggleSubform = (openSubformLabel) => {
    setOpenSubFormLabel(openSubformLabel)
  }

  const anySubFormOpen = () => {
    return openSubFormLabel !== undefined
  }

  return (
    <Form className={'activity-form condition-form'}>
      {
        conditionFormTypeNames.map((conditionTypeName) => (
          <ConditionTypeFormGroup
            key={conditionTypeName}
            conditionTypeName={conditionTypeName}
            equipmentOptions={conditionEquipmentOptions[conditionTypeName]}
            preCondition={preConditions[conditionTypeName]}
            workup={defaultConditionsForm }
            openSubFormLabel={openSubFormLabel}
            onWorkupChange={handleWorkupChange}
            onToggleSubform={handleToggleSubform}
          />)
        )
      }
      <FormButtons onSave={handleSave} onCancel={closeForm} type='primary' disabled={anySubFormOpen()} />
    </Form>

  )
}

export default DefaultConditionsForm
