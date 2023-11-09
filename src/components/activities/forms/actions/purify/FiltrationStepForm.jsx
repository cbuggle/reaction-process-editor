import OptionalFormSet from "../../formsets/OptionalFormSet";
import {FormGroup, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import React, {useContext, useState} from "react";
import {SelectOptions} from "../../../../../contexts/SelectOptions";
import ActivityDecorator from "../../../../../decorators/ActivityDecorator";
import MetricsDecorator from "../../../../../decorators/MetricsDecorator";
import NumericalInputWithUnit from "../../../../utilities/NumericalInputWithUnit";
import {SolventListEntry} from "./SolventListEntry";

export const FiltrationStepForm = (
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
  const [amount, setAmount] = useState(stepData ? stepData.amount : {value: 0})
  const [repetitions, setRepetitions] = useState(stepData ? stepData.repetitions : 1)

  const addSolvent = (solventId) => {
    setSolvents(solvents.concat({id: solventId, ratio: 1}))
  }
  const removeSolvent = (idx) => () => {
    setSolvents(solvents.toSpliced(idx, 1))
  }
  const handleRinseCheckBox = (event) => {
    setRinse(event.target.checked)
  }
  const handleAmountInputChange = (amount) => {
    setAmount({value: amount, unit: 'ml'})
  }
  const handleSetRatio = (data) => {
    setSolvents(solvents.toSpliced(
        data.index,
        1,
        {id: solvents[data.index].id, ratio: data.value}
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
      <FormGroup>
        <Select
          placeholder={'Add Solvent'}
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="purify_solvent_solvent_ids"
          options={purifySolventOptions}
          value={''}
          onChange={selectedOption => addSolvent(selectedOption.value)}
        />
        {solvents.length > 0 &&
          <>
            <Row className='gx-2 pt-1'>
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
          </>
        }
      </FormGroup>
      <FormGroup>
        <NumericalInputWithUnit
          value={amount.value}
          onChange={handleAmountInputChange}
          label='Volume'
          metricName="VOLUME"
          currentUnit={amount.unit}
          unitType={MetricsDecorator.defaultUnitType('VOLUME')}
        />
        <NumericalInputWithUnit
          value={repetitions}
          onChange={setRepetitions}
          label='Repetitions'
          unitType={MetricsDecorator.defaultUnitType('REPETITIONS')}
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
