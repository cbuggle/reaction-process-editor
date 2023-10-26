import React, { useState } from 'react'
import { Form } from 'reactstrap';

import MetricsFormGroup from '../activities/forms/conditions/MetricsFormGroup';
import FormButtons from "../utilities/FormButtons";

import { predefinableMetricNames } from '../../constants/metrics';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'


const DefaultConditionsForm = (
  {
    defaultConditions,
    preconditions,
    closeForm,
    scope,
    typeColor
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
        predefinableMetricNames.map((metricName) => (
          <MetricsFormGroup
            key={metricName}
            metricName={metricName}
            preCondition={preconditions[metricName]}
            workup={defaultConditionsForm}
            openSubFormLabel={openSubFormLabel}
            onWorkupChange={handleWorkupChange}
            onToggleSubform={handleToggleSubform}
            typeColor={typeColor}
          />)
        )
      }
      <FormButtons
        onSave={handleSave}
        onCancel={closeForm}
        type={typeColor}
        disabled={anySubFormOpen()}
      />
    </Form>

  )
}

export default DefaultConditionsForm
