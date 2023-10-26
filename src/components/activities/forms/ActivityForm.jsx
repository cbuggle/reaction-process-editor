import React, { useContext } from 'react'
import { Form } from 'reactstrap'
import PropTypes from 'prop-types'

import ApplyExtraEquipmentFormSet from './formsets/ApplyExtraEquipmentFormSet';
import DescriptionFormSet from "./formsets/DescriptionFormSet";
import FormButtons from "../../utilities/FormButtons";
import TimingFormSet from "./formsets/TimingFormSet";

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
      <TimingFormSet
        activityType={type}
        activity={activity}
        onChangeDuration={onChangeDuration}
        onWorkupChange={onWorkupChange}
      />
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        disabled={subFormController.anySubFormOpen()}
        type={type}
      />
    </Form>
  )
}

ActivityForm.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityForm
