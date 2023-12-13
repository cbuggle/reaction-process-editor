import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'reactstrap'
import PropTypes from 'prop-types'

import ApplyExtraEquipmentFormSet from './formsets/ApplyExtraEquipmentFormSet';
import DescriptionFormSet from "./formsets/DescriptionFormSet";
import FormButtons from "../../utilities/FormButtons";
import Timer from '../timing/Timer';

import ActivityValidator from '../../../validators/ActivityValidator'

import { SubFormController } from '../../../contexts/SubFormController';

const ActivityForm = (
  {
    type,
    activity,
    children,
    onCancel,
    onSave,
    onWorkupChange,
    onChangeDuration,
    className = ''
  }) => {

  const subFormController = useContext(SubFormController)

  const [disabled, setDisabled] = useState(false)
  const workup = activity.workup

  useEffect(() => {
    setDisabled(subFormController.anyBlockingSubformOpen())
  }, [subFormController, activity, activity.workup])

  const handleSave = () => ActivityValidator.validate(activity) && onSave()

  return (
    <Form className={'activity-form ' + type + '-form ' + className}>
      {children}
      <ApplyExtraEquipmentFormSet
        activityType={type}
        actionName={activity.activity_name}
        workup={workup}
        onWorkupChange={onWorkupChange}
      />
      <DescriptionFormSet
        activityType={type}
        workup={workup}
        onWorkupChange={onWorkupChange}
      />
      <Timer
        activityType={type}
        workup={workup}
        onChangeDuration={onChangeDuration}
        onWorkupChange={onWorkupChange}
        displayMode={'form'}
      />
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        disabled={disabled}
        type={type}
      />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
