import React, {useState} from 'react'
import PropTypes from 'prop-types'

import { FormGroup, Input, Form } from 'reactstrap'

import FormButtons from "../../utilities/FormButtons";
import ActionValidator from '../../../validators/ActionValidator'
import OptionalFormSet from "./OptionalFormSet";
import DescriptionFormSet from "./DescriptionFormSet";

const ActivityForm = (
  {
    type,
    activity,
    children,
    openSubFormLabel,
    onCancel,
    onSave,
    onWorkupChange,
    onToggleSubform,
    className = ''
  }) => {

  const handleSave = () => {
    if (ActionValidator.validate(activity)) {
      onSave()
    }
  }

  const subFormOpenState = () => {
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
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        disabled={subFormOpenState()}
        type={type}
      />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
