import React, { useContext } from 'react'
import { FormGroup, Label } from 'reactstrap'

import EquipmentSubsetForm from './EquipmentSubsetForm';

import { SelectOptions } from '../../../../contexts/SelectOptions';

const EquipmentSubsetFormSection = (
  {
    metricName,
    equipment,
    onChangeEquipment
  }) => {

  const equipmentOptions = useContext(SelectOptions).FORMS.CONDITION.equipment[metricName]

  return (
    <>
      {equipmentOptions.length > 0 &&
        <FormGroup>
          <Label>
            {'Equipment'}
          </Label>
          <EquipmentSubsetForm
            equipment={equipment}
            metricName={metricName}
            onChangeEquipment={onChangeEquipment}
          />
        </FormGroup >
      }
    </>
  )
}

export default EquipmentSubsetFormSection
