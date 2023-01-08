import React, { useEffect, useState } from 'react'
import { ListGroupItem, Row, Col, Label } from 'reactstrap'
import Select from 'react-select'

import { equipmentMountOptions } from '../../../constants/dropdownOptions/equipmentOptions'

const EquipmentForm = ({ action, onWorkupChange, processStep }) => {

  const [equipmentOptions, setEquipmentOptions] = useState([])

  useEffect(() => {
    changeMountOption(action.workup['mount_action'])
  }, [])

  const changeMountOption = (value) => {
    if (value === "MOUNT") {
      setEquipmentOptions(processStep.equipment_options)
    } else {
      setEquipmentOptions(processStep.mounted_equipment_options)
    }

    onWorkupChange({ name: 'mount_action', value: value })
  }

  return (
    <div className="equipment-form">
      <ListGroupItem>
        <Row>
          <Col md={12}>
            <Label>Action</Label>
            <Select
              name="mount_action"
              options={equipmentMountOptions}
              value={equipmentMountOptions.find(option => option.value === action.workup['mount_action'])}
              onChange={selectedOption => changeMountOption(selectedOption.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label>Equipment</Label>
            <Select
              name="equipment"
              options={equipmentOptions}
              value={equipmentOptions.find(option => option.value === action.workup['equipment'])}
              onChange={selectedOption => onWorkupChange({ name: 'equipment', value: selectedOption.value })}
            />
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  )
}

export default EquipmentForm
