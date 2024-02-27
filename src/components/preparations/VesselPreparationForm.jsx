import React, { useContext, useState } from 'react'
import { Label, Form, FormGroup } from 'reactstrap'
import Select from 'react-select'

import FormButtons from '../utilities/FormButtons'
import VesselDecorator from '../../decorators/VesselDecorator'
import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'
import { SelectOptions } from '../../contexts/SelectOptions';


const VesselPreparationForm = ({ reactionProcessVessel }) => {

  const api = useReactionsFetcher()

  const selectOptions = useContext(SelectOptions)
  const preparationOptions = selectOptions.vessel_preparations.preparation_types
  const [vesselPreparationForm, updateVesselPreparationForm] = useState(reactionProcessVessel)
  console.log("selectOptions")
  console.log(selectOptions.vessel_preparations)

  const onInputChange = (field) => {
    const { name, value } = field;
    updateVesselPreparationForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleSave = (e) => { api.updateReactionProcessVessel(vesselPreparationForm) }

  const onCancel = () => { updateVesselPreparationForm(reactionProcessVessel) }

  return (
    <Form>
      <h6 className="mb-1">
        {VesselDecorator.vesselSingleLine(reactionProcessVessel.vessel)}
      </h6>
      <FormGroup>
        <Label>Preparations</Label>
        <Select
          className='react-select--overwrite'
          classNamePrefix='react-select'
          name="sample_id"
          isDisabled={false}
          isMulti
          isClearable={false}
          options={preparationOptions}
          value={preparationOptions.filter(option => vesselPreparationForm.preparations?.includes(option.value))}
          onChange={selected => onInputChange({ name: 'preparations', value: selected.map(option => option.value) })}
        />
        <FormButtons onSave={handleSave} onCancel={onCancel} type='preparation' />
      </FormGroup>
    </Form>
  )
}

export default VesselPreparationForm
