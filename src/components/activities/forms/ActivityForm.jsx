import React from 'react'
import PropTypes from 'prop-types'

import { FormGroup, Label, Input, Form } from 'reactstrap'

import FormButtons from "../../utilities/FormButtons";
import ActionValidator from '../../../validators/ActionValidator'

const ActivityForm = (props) => {

  const onSave = () => {
    if (ActionValidator.validate(props.activity)) {
      props.onSave()
    }
  }

  return (
    <Form>
      <FormGroup>
        <Label>Description</Label>
        {props.activity.id ? "" : " (leave empty to autofill)"}
        <Input
          type="textarea"
          value={props.activity.workup.description}
          placeholder="Description"
          onChange={event => props.onWorkupChange({ name: 'description', value: event.target.value })}
        />
      </FormGroup>
      {props.children}
      <FormButtons onSave={onSave} onCancel={props.onCancel} type={props.type} />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
