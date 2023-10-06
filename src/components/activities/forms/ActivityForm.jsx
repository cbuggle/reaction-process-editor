import React from 'react'
import { Form } from 'reactstrap'
import PropTypes from 'prop-types'

import ActionValidator from '../../../validators/ActionValidator'
import DescriptionFormSet from "./DescriptionFormSet";
import FormButtons from "../../utilities/FormButtons";
import TimingFormSet from "./TimingFormSet";

const ActivityForm = (
  {
    type,
    activity,
    children,
    openSubFormLabel,
    onCancel,
    onSave,
    onWorkupChange,
    onChangeDuration,
    onToggleSubform,
    className = ''
  }) => {

  const handleSave = () => {
    if (ActionValidator.validate(activity)) {
      onSave()
    }
  }

  const anySubFormOpen = () => {
    return openSubFormLabel !== undefined
  }

  return (
    <Form className={'activity-form ' + type + '-form ' + className}>
      {children}
      <DescriptionFormSet
        activityType={type}
        activity={activity}
        openSubFormLabel={openSubFormLabel}
        onToggleSubform={onToggleSubform}
        onWorkupChange={onWorkupChange}
      />
      <TimingFormSet
        activityType={type}
        activity={activity}
        openSubFormLabel={openSubFormLabel}
        onToggleSubform={onToggleSubform}
        onChangeDuration={onChangeDuration}
        onWorkupChange={onWorkupChange}
      />
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        disabled={anySubFormOpen()}
        type={type}
      />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
