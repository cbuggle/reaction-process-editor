import React, { useContext, useState } from 'react'
import Select from 'react-select'

import OptionalFormSet from './OptionalFormSet'

import { SelectOptions } from '../../../../contexts/SelectOptions'

import ActivityDecorator from '../../../../decorators/ActivityDecorator'

const ApplyExtraEquipmentFormSet = (
  {
    activityType,
    activity,
    openSubFormLabel,
    onToggleSubform,
    onWorkupChange
  }) => {

  const [equipment, setEquipment] = useState(activity.workup.equipment)

  const selectOptions = useContext(SelectOptions)
  const equipmentOptions = selectOptions.action_type_equipment[activity.action_name]

  const handleSaveEquipment = () => onWorkupChange({ name: 'equipment', value: equipment })

  const handleCancelEquipment = () => setEquipment(activity.workup.equipment)

  return (
    <>
      {equipmentOptions.length > 0 &&
        <OptionalFormSet
          subFormLabel='Equipment'
          valueSummary={ActivityDecorator.infoLineEquipment(activity.workup['equipment'], equipmentOptions)}
          openSubFormLabel={openSubFormLabel}
          onSave={handleSaveEquipment}
          onCancel={handleCancelEquipment}
          onToggleSubform={onToggleSubform}
          typeColor={activityType}
        >
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            isMulti
            name="equipment"
            options={equipmentOptions}
            value={equipmentOptions.filter(option => (equipment || []).includes(option.value))}
            onChange={selectedOptions => setEquipment(selectedOptions.map(option => option.value))}
          />
        </OptionalFormSet>
      }
    </>
  )
}

export default ApplyExtraEquipmentFormSet
