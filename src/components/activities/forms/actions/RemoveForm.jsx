import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import FormSection from "../../../utilities/FormSection";
import MetricsDecorator from '../../../../decorators/MetricsDecorator';
import MetricsInput from '../../../utilities/MetricsInput';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import { SelectOptions } from '../../../../contexts/SelectOptions';
import { StepSelectOptions } from '../../../../contexts/StepSelectOptions';
import { removeFormMetricNames } from '../../../../constants/metrics';

const RemoveForm = (
  {
    workup,
    preconditions,
    onWorkupChange
  }) => {

  const stepSelectOptions = useContext(StepSelectOptions)
  const selectOptions = useContext(SelectOptions)

  const mediumSelectOptions = stepSelectOptions.removable_materials['MEDIUM']
    .concat([{ value: "", label: "Undefined" }])
  const additivesSelectOptions = stepSelectOptions.removable_materials['ADDITIVE']
    .concat([{ value: "", label: "Undefined" }])
  const diverseSolventsSelectOptions = stepSelectOptions.removable_materials['DIVERSE_SOLVENT']
    .concat([{ value: "", label: "Undefined" }])

  const handleActsAsChange = ({ actsAs }) => {
    onWorkupChange({ name: 'acts_as', value: actsAs })
    onWorkupChange({ name: 'sample_id', value: '' })

    // reset those workups n/a in new actsAs
    if (actsAs === 'MEDIUM') {
      removeFormMetricNames.forEach(metricName =>
        onWorkupChange({ name: metricName, value: null }))
    } else {
      onWorkupChange({ name: 'remove_repetitions', value: null })
      onWorkupChange({ name: 'replacement_medium', value: null })
    }
  }

  const handleAmountChange = (name) => (amount) => onWorkupChange({ name: name, value: amount })
  const handleSampleChange = (sampleId) => onWorkupChange({ name: 'sample_id', value: sampleId })

  const findCurrentConditionAmount = (metricName) => {
    return workup[metricName] ? workup[metricName] : preconditions[metricName]
  }

const renderConditions = () => {
  return (
    removeFormMetricNames.map(metricName =>
      <>
        <MetricsInput
          metricName={metricName}
          amount={findCurrentConditionAmount(metricName)}
          onChange={handleAmountChange(metricName)}
        />
      </>
    )
  )
}

const renderSampleSelect = (label, selectOptions) => {
  return (
    <SingleLineFormGroup label={label}>
      <Select
        // Setting key forces re-render when label changes, as a change on value={workup['sample_id']} alone
        // will retain the previous selection (which isn't even in the selectOptions anymore, they change alongside).
        // React state model for the glory.
        key={label}
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name="sample_id"
        options={selectOptions}
        value={selectOptions.find(option => option.value === workup['sample_id'])}
        onChange={selectedOption => handleSampleChange(selectedOption.value)}
      />
    </SingleLineFormGroup>
  )
}

const renderSolventRemoveFields = (label, solventOptions) => {
  return (
    <>
      {renderSampleSelect(label, solventOptions)}
      {renderConditions()}
    </>
  )
}

const renderMediumRemoveFields = () => {
  return (
    < >
      {renderSampleSelect('Sample', mediumSelectOptions)}
      <MetricsInput
        metricName={'REPETITIONS'}
        amount={workup['remove_repetitions'] || MetricsDecorator.defaultAmount('REPETITIONS')}
        onChange={handleAmountChange('remove_repetitions')}
      />
      <SingleLineFormGroup label='Replacement Medium'>
        <Input
          type="textarea"
          value={workup['replacement_medium']}
          placeholder="Replacement Medium"
          onChange={event => onWorkupChange({ name: 'replacement_medium', value: event.target.value })}
        />
      </SingleLineFormGroup>
    </>
  )
}

const renderGenericRemoveFields = () => {
  switch (workup['acts_as']) {
    case 'ADDITIVE':
      return renderSolventRemoveFields('Solvent (Additive)', additivesSelectOptions)
    case 'DIVERSE_SOLVENT':
      return renderSolventRemoveFields('Solvent (Diverse)', diverseSolventsSelectOptions)
    case 'MEDIUM':
      return renderMediumRemoveFields()
    default:
      break;
  }
}

return (
  <FormSection type='action'>
    <SingleLineFormGroup label='Type'>
      <Select
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name="acts_as"
        options={selectOptions.remove_sample_types}
        value={selectOptions.remove_sample_types.find(option => option.value === workup['acts_as'])}
        onChange={selectedOption => handleActsAsChange({ actsAs: selectedOption.value })}
      />
    </SingleLineFormGroup>
    {renderGenericRemoveFields()}
  </FormSection>
)
}

export default RemoveForm

