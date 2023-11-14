import React, { useContext, useState } from "react";
import { FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";

import ActivityDecorator from "../../../../../decorators/ActivityDecorator";
import OptionalFormSet from "../../formsets/OptionalFormSet";
import { SolventListEntry } from "./SolventListEntry";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import MetricsInput from "../../../../utilities/MetricsInput";

const FiltrationStepForm = (
  {
    index,
    stepData,
    onSave,
    onCancel
  }) => {
  const selectOptions = useContext(SelectOptions)
  const purifySolventOptions = selectOptions.materials['SOLVENT']

  const label = 'Filtration Step ' + (index + 1)
  const [solvents, setSolvents] = useState(stepData ? stepData.solvents : [])
  const [rinse, setRinse] = useState(stepData ? stepData.rinse_vessel : false)
  const [amount, setAmount] = useState(stepData ? stepData.amount : { value: 0, unit: 'ml' })
  const [repetitions, setRepetitions] = useState(stepData ? stepData.repetitions : {value: 1, unit: 'TIMES'})

  const addSolvent = (solventId) => setSolvents(solvents.concat({ id: solventId, ratio: 1 }))

  const removeSolvent = (idx) => () => setSolvents(solvents.toSpliced(idx, 1))

  const handleRinseCheckBox = (event) => setRinse(event.target.checked)

  const handleSetRatio = (data) => {
    setSolvents(solvents.toSpliced(
      data.index,
      1,
      { id: solvents[data.index].id, ratio: data.value }
    ))
  }

  const handleSave = () => {
    onSave({
      index,
      data: {
        solvents,
        amount,
        repetitions,
        rinse_vessel: rinse
      }
    })
  }

  return (
    <OptionalFormSet
      subFormLabel={label}
      valueSummary={ActivityDecorator.filtrationStepInfo({
        solvents,
        amount,
        repetitions
      },
        purifySolventOptions
      )}
      onSave={handleSave}
      onCancel={onCancel}
      typeColor='action'
      initialShowForm={!stepData}
    >
      <FormGroup className="mb-2">
        <div className="filtration-step-form__solvent-list">
          <Row className='gx-2 pb-1 px-2 mx-0'>
            <Label className='col-9 col-form-label'>Solvent</Label>
            <Label className='col-3 col-form-label'>Ratio</Label>
          </Row>
          {solvents.map((solvent, idx) =>
            <SolventListEntry
              label={purifySolventOptions.find(option => solvent.id === option.value).label}
              ratio={solvent.ratio}
              index={idx}
              onRemoveSolvent={removeSolvent}
              onSetRatio={handleSetRatio}
              key={solvent.id + '-' + idx}
            />
          )}
        </div>
          <Select
            placeholder={'Add Solvent'}
            className="react-select--overwrite filtration-step-form__solvent-select"
            classNamePrefix="react-select"
            name="purify_solvent_solvent_ids"
            options={purifySolventOptions}
            value={''}
            onChange={selectedOption => addSolvent(selectedOption.value)}
          />
      </FormGroup>
      <FormGroup>
        <MetricsInput
          metricName={'VOLUME'}
          amount={amount}
          onChange={setAmount}
        />
        <MetricsInput
          metricName={'REPETITIONS'}
          onChange={setRepetitions}
          amount={repetitions}
        />
        <FormGroup check className='mb-3'>
          <Label check>
            <Input type="checkbox" checked={rinse} onChange={handleRinseCheckBox} />
            Rinse Vessel
          </Label>
        </FormGroup>
      </FormGroup>
    </OptionalFormSet>
  )
}

export default FiltrationStepForm
