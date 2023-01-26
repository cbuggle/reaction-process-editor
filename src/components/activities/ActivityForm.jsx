import React from 'react'
import PropTypes from 'prop-types'

import { ListGroupItem, FormGroup, Label, Input, Form } from 'reactstrap'

import AddSampleForm from './forms/AddSampleForm'
import EquipmentForm from './forms/EquipmentForm'
import ConditionForm from './forms/ConditionForm'
import MotionForm from './forms/MotionForm'
import TransferForm from './forms/TransferForm'
import RemoveForm from './forms/RemoveForm'
import PurifyForm from './forms/PurifyForm'
import AnalysisForm from './forms/AnalysisForm'
import ApplyEquipmentForm from './forms/ApplyEquipmentForm'
import SaveSampleForm from './forms/SaveSampleForm'
import FormButtons from "../utilities/FormButtons";
import ActionValidator from '../../validators/ActionValidator'

const ActivityForm = (props) => {

  const renderConditionForm = () => {
    switch (props.action.workup.condition_type) {
      case "MOTION":
        return (
          <>
            <MotionForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      default:
        return (
          <>
            <ConditionForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
    }
  }

  const customActionForm = () => {
    switch (props.action.action_name) {
      case "ADD":
        return (
          <>
            <AddSampleForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "SAVE":
        return (
          <SaveSampleForm {...props} />
        )
      case "EQUIP":
        return (
          <EquipmentForm {...props} />
        )
      case "CONDITION":
        return renderConditionForm()
      case "TRANSFER":
        return (
          <>
            <TransferForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "REMOVE":
        return (
          <>
            <RemoveForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "PURIFY":
        return (
          <>
            <PurifyForm {...props} />
            <ApplyEquipmentForm {...props} />
          </>
        )
      case "ANALYSIS":
        return (
          <>
            <AnalysisForm {...props} />
          </>
        )
      case 'PAUSE':
      case "WAIT":
        return (<></>)
      default:
        return (<div>Error in Sample Form: Unknown ACTION TYPE: {props.action.action_name} ***</div>)
    }
  }

  const onSave = () => {
    if (ActionValidator.validate(props.action)) {
      props.onSave()
    }
  }

  return (
    <Form>
      <FormGroup>
        <Label>Description</Label>
        {props.action.id ? "" : " (leave empty to autofill)"}
        <Input
          type="textarea"
          value={props.action.workup.description}
          placeholder="Description"
          onChange={event => props.onWorkupChange({ name: 'description', value: event.target.value })}
        />
      </FormGroup>
      {customActionForm()}
      <FormButtons onSave={onSave} onCancel={props.onCancel} type='action' />
    </Form>
  )
}

ActivityForm.propTypes = {
  action: PropTypes.object.isRequired
}

export default ActivityForm
