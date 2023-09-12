import React, {useState} from 'react'
import PropTypes from 'prop-types'

import { FormGroup, Input, Form } from 'reactstrap'

import FormButtons from "../../utilities/FormButtons";
import ActionValidator from '../../../validators/ActionValidator'
import OptionalFormSet from "./OptionalFormSet";

const ActivityForm = (
  {
    type,
    activity,
    children,
    subFormOpenState,
    onCancel,
    onSave,
    onWorkupChange,
    onChangeSubFormOpenState,
    className = ''
  }) => {
  const [description, setDescription] = useState(activity.workup.description)
  const descriptionLabel = 'Description'

  const handleSave = () => {
    if (ActionValidator.validate(activity)) {
      onSave()
    }
  }

  const handleSaveDescription = () => {
    onWorkupChange({ name: 'description', value: description })
  }

  const handleCancelDescription = () => {
    setDescription(activity.workup.description)
  }

  return (
    <Form className={'activity-form ' + type + '-form ' + className}>
      {children}
      <OptionalFormSet
        groupLabel={descriptionLabel}
        valueSummary={activity.workup.description}
        onSave={handleSaveDescription}
        onCancel={handleCancelDescription}
        onChangeSubFormOpenState={onChangeSubFormOpenState}
        type={type}
      >
        <FormGroup>
          <Input
            type="textarea"
            name="description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </FormGroup>
      </OptionalFormSet>
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        disabled={subFormOpenState}
        type={type}
        separator={true}
      />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
