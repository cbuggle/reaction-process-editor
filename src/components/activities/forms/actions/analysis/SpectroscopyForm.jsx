import React, { useContext } from 'react'
import { Label, FormGroup } from 'reactstrap'
import Select from 'react-select';

import FormSection from '../../../../utilities/FormSection'
import ButtonGroupToggle from '../../formgroups/ButtonGroupToggle'

import OntologySelectFormGroup from '../../formgroups/OntologySelectFormGroup'
import OntologyMultiSelectFormGroup from '../../formgroups/OntologyMultiSelectFormGroup'

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'
import OntologiesDecorator from '../../../../../decorators/OntologiesDecorator'

import { SelectOptions } from '../../../../../contexts/SelectOptions';
import { StepSelectOptions } from '../../../../../contexts/StepSelectOptions';

import { ontologyId } from '../../../../../constants/ontologyId'
import SamplesIconSelect from '../../../../utilities/SamplesIconSelect'

const SpectroscopyForm = ({ workup, onWorkupChange }) => {
	const ontologies = useContext(SelectOptions).ontologies

	const filteredOntologiesForRole = (roleName) => OntologiesDecorator.activeOptionsMeetingDependencies({ roleName: roleName, options: ontologies, workup: workup })

	const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

	const handleChangeAutomation = (automation) => {
		if (automation !== ontologyId.automation_modes.automated) {
			onWorkupChange({ name: 'method', value: undefined })
		}
		onWorkupChange({ name: 'automation_mode', value: automation })
	}

	const handleChangeType = (newType) => {
		onWorkupChange({ name: 'type', value: newType?.value })
		handleChangeSubType(OptionsDecorator.optionForValue(workup.subtype, filteredOntologiesForRole('subtype')))
	}

	const handleChangeSubType = (newSubType) => {
		onWorkupChange({ name: 'subtype', value: newSubType?.value })
	}

	const handleChangeDetectors = (detectors) => {
		onWorkupChange({ name: 'detector', value: detectors?.map(detector => detector.value) })
	}

	const handleSelectChange = (workupKey) => (selected) => onWorkupChange({ name: workupKey, value: selected.value })


	const sampleOptions = useContext(StepSelectOptions).saved_samples
	const currentSample = OptionsDecorator.optionForValue(workup['sample_id'], sampleOptions)

	return (
		<FormSection>
			<FormGroup>
				<Label>Sample</Label>
				<Select
					key={"sample" + currentSample?.value}
					className="react-select--overwrite"
					classNamePrefix="react-select"
					name="sample_id"
					options={sampleOptions}
					value={currentSample}
					onChange={handleSelectChange('sample_id')}
				/>
			</FormGroup>
			<FormGroup>
				<Label>Molecular Entities</Label>
				<SamplesIconSelect
					isMulti
					isClearable={false}
					samples={workup.molecular_entities}
					onChange={handleWorkupChange("molecular_entities")} />
			</FormGroup>
			<ButtonGroupToggle
				value={workup.automation_mode}
				options={filteredOntologiesForRole('automation_mode')}
				onChange={handleChangeAutomation} />

			<OntologySelectFormGroup
				key={"type" + workup.type}
				roleName={'type'}
				workup={workup}
				onChange={handleChangeType}
			/>
			<OntologySelectFormGroup
				key={"subtype" + workup.subtype}
				roleName={'subtype'}
				workup={workup}
				onChange={handleChangeSubType}
			/>
			<OntologySelectFormGroup
				key={"device" + workup.device}
				roleName={'device'}
				workup={workup}
				onChange={selected => onWorkupChange({ name: 'device', value: selected?.value })}
			/>
			<OntologyMultiSelectFormGroup
				key={"detector" + workup.detector}
				label={'Detectors'}
				roleName={'detector'}
				workup={workup}
				onChange={handleChangeDetectors}
			/>
		</FormSection>
	)
}

export default SpectroscopyForm
