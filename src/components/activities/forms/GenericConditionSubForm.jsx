import React, { useMemo } from 'react';
import {Input, Label, FormGroup} from "reactstrap";
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import { conditionAdditionalInformationOptions, conditionInputRanges } from "../../../constants/dropdownOptions/conditionsOptions";
import Select from "react-select";

const GenericConditionSubForm = ({label, typeName, workup, onWorkupChange}) => {
  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[typeName] }, [typeName])
  const powerInputRange = conditionInputRanges['POWER']
  const currentSelectedAdditionalInformationOption = useMemo(() => { return currentAdditionalInformationOptions.find(option => option.value === workup['condition_additional_information']) || currentAdditionalInformationOptions[0]})

  const renderPowerForm = () => {
    return (
      <FormGroup>
        <NumericalInputWithUnit
          label='Power (Start)'
          name='power_value'
          value={workup['power_value']}
          inputRanges={powerInputRange}
          onWorkupChange={onWorkupChange}
        />
        <FormGroup check className='mb-3'>
          <Input type="checkbox" checked={workup['power_is_ramp']} onChange={handleCheckbox} />
          <Label check>Power Ramp</Label>
        </FormGroup>
        {workup['power_is_ramp'] &&
          <NumericalInputWithUnit
            label='Power (End)'
            name='power_end_value'
            value={workup['power_end_value'] || workup['power_value'] || powerInputRange['default']}
            inputRanges={powerInputRange}
            onWorkupChange={onWorkupChange}
          />
        }
      </FormGroup>
    )
  }

  const handleCheckbox = (event) => {
    onWorkupChange({ name: 'power_is_ramp', value: event.target.checked })

    if (!event.target.checked) {
      onWorkupChange({ name: 'power_end_value', value: "" })
    }
  }

  const renderAdditionalInformationSelect = () => {
    return (
      currentAdditionalInformationOptions.length > 0 ?
        <>
          <Label>
            Additional Information
          </Label>
          <Select
            name="condition_additional_information"
            options={currentAdditionalInformationOptions}
            value={currentSelectedAdditionalInformationOption}
            onChange={selectedOption => onWorkupChange({ name: 'condition_additional_information', value: selectedOption.value })}
          />
        </>:
      <></>
    )
  }

  return (
    <>
      <FormGroup>
        <NumericalInputWithUnit
          label={label}
          name='condition_value'
          value={workup['condition_value']}
          inputRanges={conditionInputRanges[typeName]}
          onWorkupChange={onWorkupChange}
          hasTendencyOption={true}
          tendencyValue={workup.condition_tendency}
        />
      </FormGroup>
      <FormGroup>
        {renderPowerForm()}
      </FormGroup>
      {currentAdditionalInformationOptions.length > 0 &&
        <FormGroup>
          {renderAdditionalInformationSelect()}
        </FormGroup>
      }
    </>
  );
};

export default GenericConditionSubForm;
