import React, { useContext } from 'react'
import Select from 'react-select'

import { Input, FormGroup, Label } from 'reactstrap';

import IconButton from '../../../../utilities/IconButton';
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import { SelectOptions } from '../../../../../contexts/SelectOptions';
import AmountInput from '../../../../utilities/AmountInput';

const FiltrationRepeatForm = ({ workup, onWorkupChange, onDelete }) => {

  const selectOptions = useContext(SelectOptions)
  const purifySolventIds = workup['purify_solvent_sample_ids'] || []
  const purifySolventOptions = selectOptions.materials['SOLVENT']

  const handleRinseCheckBox = (event) => {
    onWorkupChange({ rinse_vessel: event.target.checked })
  }

  const handleAmountInputChange = ({ amount, unit }) => {
    onWorkupChange({ 'AMOUNT': { value: amount, unit: unit } })
  }

  return (
    <>
      <IconButton onClick={onDelete} icon='trash' className='icon-button--positive' size='sm' />
      <SingleLineFormGroup label='Solvents'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          isMulti
          name="purify_solvent_sample_ids"
          options={purifySolventOptions}
          value={purifySolventOptions.filter(option => purifySolventIds.includes(option.value))}
          onChange={selectedOptions => onWorkupChange({ 'purify_solvent_sample_ids': selectedOptions.map(option => option.value) })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Ratio'>
        <Input
          value={workup['ratio']}
          placeholder="Ratio"
          onChange={event => onWorkupChange({ 'ratio': event.target.value })}
        />
      </SingleLineFormGroup>
      <FormGroup check className='mb-3'>
        <Label check>
          <Input type="checkbox" checked={workup['rinse_vessel']} onChange={handleRinseCheckBox} />
          Rinse Vessel
        </Label>
      </FormGroup>
      <FormGroup check className='mb-3'>
        <AmountInput
          metricName="VOLUME"
          currentAmount={workup['AMOUNT'].value}
          currentUnit={workup['AMOUNT'].unit}
          onChangeAmountInput={handleAmountInputChange}
        />
      </FormGroup>
    </>
  )
}

export default FiltrationRepeatForm
