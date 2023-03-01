import React from 'react'
import PropTypes from 'prop-types'

import { FormGroup, Label, Input, Form } from 'reactstrap'

import FormButtons from "../../utilities/FormButtons";
import ActionValidator from '../../../validators/ActionValidator'

const ActivityForm = (
  {
    type,
    activity,
    children,
    onCancel,
    onSave,
    onWorkupChange,
  }) => {

  const onHandleSave = () => {
    if (ActionValidator.validate(activity)) {
      onSave()
    }
  }

  return (
    <Form>
      <FormGroup>
        <Label>Description</Label>
        {activity.id ? "" : " (leave empty to autofill)"}
        <Input
          type="textarea"
          value={activity.workup.description}
          placeholder="Description"
          onChange={event => onWorkupChange({ name: 'description', value: event.target.value })}
        />
      </FormGroup>
      {children}
      <FormButtons onSave={onHandleSave} onCancel={onCancel} type={type} />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
