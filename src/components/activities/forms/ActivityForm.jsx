import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'reactstrap'
import PropTypes from 'prop-types'

import ApplyExtraEquipmentFormSet from './formsets/ApplyExtraEquipmentFormSet';
import DescriptionFormSet from "./formsets/DescriptionFormSet";
import FormButtons from "../../utilities/FormButtons";
import Timer from '../timing/Timer';

import ActionValidator from '../../../validators/ActionValidator'

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

  useEffect(() => {
    setDisabled(subFormController.anyBlockingSubformOpen())
  }, [subFormController, activity, activity.workup])

  const handleSave = () => ActionValidator.validate(activity) && onSave()

  return (
    <Form className={'activity-form ' + type + '-form ' + className}>
      {children}
      <ApplyExtraEquipmentFormSet
        activityType={type}
        activity={activity}
        onWorkupChange={onWorkupChange}
      />
      <DescriptionFormSet
        activityType={type}
        activity={activity}
        onWorkupChange={onWorkupChange}
      />
      <Timer
        activityType={type}
        workup={activity.workup}
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
