import React, { useContext, useState } from "react";
import { FormGroup, Input, Label, Row } from "reactstrap";

import ActivityDecorator from "../../../../../decorators/ActivityDecorator";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../formsets/OptionalFormSet";
import SolventListForm from "./SolventListForm";

import { SelectOptions } from "../../../../../contexts/SelectOptions";

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
  const [repetitions, setRepetitions] = useState(stepData ? stepData.repetitions : { value: 1, unit: 'TIMES' })

  const handleRinseCheckBox = (event) => setRinse(event.target.checked)

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
      <SolventListForm
        solvents={solvents}
        solventOptions={purifySolventOptions}
        setSolvents={setSolvents}
      />
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
