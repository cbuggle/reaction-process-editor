import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import FormSection from '../../../../utilities/FormSection'
import ButtonGroupToggle from '../../formgroups/ButtonGroupToggle'
import SelectFormGroup from '../../formgroups/SelectFormGroup'
import SingleLineFormGroup from '../../formgroups/SingleLineFormGroup'

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'
import OntologiesDecorator from '../../../../../decorators/OntologiesDecorator'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import { chmoId } from '../../../../../constants/chmoId'

const SpectroscopyForm = ({ workup, onWorkupChange }) => {
	const ontologies = useContext(SelectOptions).ontologies

	const filteredOntologiesForRole = (roleName) => OntologiesDecorator.filterByDependencies({ roleName: roleName, options: ontologies, workup: workup })

	const currentType = OptionsDecorator.inclusiveOptionForValue(workup.type, filteredOntologiesForRole('type'))
	const currentSubtype = OptionsDecorator.inclusiveOptionForValue(workup.subtype, filteredOntologiesForRole('subtype'))


	const handleChangeAutomation = (automation) => {
		if (automation !== chmoId.mode.automated) {
			onWorkupChange({ name: 'method', value: undefined })
		}
		onWorkupChange({ name: 'mode', value: automation })
	}

	const handleChangeType = (newType) => {
		onWorkupChange({ name: 'type', value: newType.value })
		handleChangeSubType(OptionsDecorator.optionForValue(workup.subtype, filteredOntologiesForRole('subtype')))
	}

	const handleChangeSubType = (newSubType) => {
		onWorkupChange({ name: 'subtype', value: newSubType?.value })
	}

	const handleChangeDetectors = (detectors) => {
		onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
	}

	return (
		<FormSection>
			<ButtonGroupToggle value={workup.mode} options={filteredOntologiesForRole('mode_usage')}
				onChange={handleChangeAutomation} />
			<SelectFormGroup
				label={'Type'}
				options={OptionsDecorator.inclusiveOptions(currentType, filteredOntologiesForRole('type'))}
				value={workup.type}
				onChange={handleChangeType}
			/>
			<SelectFormGroup
				key={"subtype" + workup.subtype}
				label={'Subtype'}
				options={OptionsDecorator.inclusiveOptions(currentSubtype, filteredOntologiesForRole('subtype'))}
				value={workup.subtype}
				onChange={handleChangeSubType}
			/>
			<SelectFormGroup
				key={"detectors" + workup.detectors}
				label={"Detectors"}
				options={filteredOntologiesForRole('detector')}
				value={workup.detectors}
				onChange={handleChangeDetectors}
				isMulti
				isClearable={false}
			/>
			{workup.device}
			<SingleLineFormGroup label='Type'>
				<Select
					className="react-select--overwrite"
					classNamePrefix="react-select"
					options={filteredOntologiesForRole('device')}
					selected={OptionsDecorator.inclusiveOptionForValue(workup.device, filteredOntologiesForRole('device'))}
					onChange={selected => onWorkupChange({ name: 'device', value: selected.value })}
				/>
			</SingleLineFormGroup>
		</FormSection>
	)
}

export default SpectroscopyForm
