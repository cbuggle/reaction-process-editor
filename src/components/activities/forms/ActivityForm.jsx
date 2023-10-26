import React from 'react'
import { Form } from 'reactstrap'
import PropTypes from 'prop-types'

import ApplyExtraEquipmentFormSet from './ApplyExtraEquipmentFormSet';
import DescriptionFormSet from "./DescriptionFormSet";
import FormButtons from "../../utilities/FormButtons";
import TimingFormSet from "./TimingFormSet";

import ActionValidator from '../../../validators/ActionValidator'

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

  const handleSave = () => ActionValidator.validate(activity) && onSave()

  const anySubFormOpen = () => openSubFormLabel !== undefined

  return (
    <Form className={'activity-form ' + type + '-form ' + className}>
      {children}
      <ApplyExtraEquipmentFormSet
        activityType={type}
        activity={activity}
        openSubFormLabel={openSubFormLabel}
        onToggleSubform={onToggleSubform}
        onWorkupChange={onWorkupChange}
      />
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
