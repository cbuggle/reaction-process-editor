import React, { useContext, useState } from "react";
import { FormGroup, Label } from "reactstrap";

import ActivityDecorator from "../../../../../decorators/ActivityDecorator";
import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../formsets/OptionalFormSet";
import SolventListForm from "./SolventListForm";

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const ChromatographyStepForm = (
  {
    index,
    workup,
    onSave,
    onCancel
  }) => {
  const selectOptions = useContext(SelectOptions)
  const purifySolventOptions = selectOptions.materials['SOLVENT']

  const label = 'Chromatography Step ' + (index + 1)
  const [solvents, setSolvents] = useState(workup ? workup.solvents : [])
  const [amount, setAmount] = useState(workup?.amount || { value: 0, unit: 'ml' })
  const [stepMode, setStepMode] = useState(workup?.step_mode || selectOptions.purify.chromatography.step_modes[0].value )
  const [prodMode, setProdMode] = useState(workup?.prod_mode || selectOptions.purify.chromatography.prod_modes[0].value)

  const handleSave = () => {
    onSave({
      index,
      data: {
        solvents,
        amount,
        step_mode: stepMode,
        prod_mode: prodMode
      }
    })
  }

  return (
    <OptionalFormSet
      subFormLabel={label}
      valueSummary={ActivityDecorator.chromatographyStepInfo({
        solvents,
        amount,
      },
        purifySolventOptions
      )}
      onSave={handleSave}
      onCancel={onCancel}
      typeColor='action'
      initialShowForm={!workup}
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
        <Label>Step</Label>
        <ButtonGroupToggle
          value={stepMode}
          options={selectOptions.purify.chromatography.step_modes}
          onChange={selectedValue => setStepMode(selectedValue)}
        />
        <Label>Prod</Label>
        <ButtonGroupToggle
          value={prodMode}
          options={selectOptions.purify.chromatography.prod_modes}
          onChange={selectedValue => setProdMode(selectedValue)}
        />
      </FormGroup>
    </OptionalFormSet>
  )
}

export default ChromatographyStepForm
