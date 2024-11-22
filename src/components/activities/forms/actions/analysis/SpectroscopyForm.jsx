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
	const ontologieOptions = useContext(SelectOptions).ONTOLOGIES
	console.log(ontologieOptions)
	const currentType = OptionsDecorator.inclusiveOptionForValue(workup.type, ontologieOptions.type)
	const currentSubtype = OptionsDecorator.inclusiveOptionForValue(workup.subtype, ontologieOptions.subtype)
	const currentDetectors = OptionsDecorator.inclusiveOptionsForValues(workup.detectors, ontologieOptions.detector)


	const handleChangeAutomation = (automation) => {
		console.log("handleChangeAutomation")
		console.log(automation)
		if (automation === chmoId.mode.automated) {
		} else {
			onWorkupChange({ name: 'method', value: undefined })
		}
		onWorkupChange({ name: 'mode', value: automation })
	}


	const handleChangeType = (newType) => {
		console.log(workup)
		onWorkupChange({ name: 'type', value: newType.value })
		handleChangeSubType(OptionsDecorator.optionForValue(workup.subtype, filterByDependencies(ontologieOptions.subtype)))
	}

	const handleChangeSubType = (newSubType) => {
		console.log("change subtype")
		console.log(newSubType)
		onWorkupChange({ name: 'subtype', value: newSubType?.value })
	}

	const handleChangeDetectors = (detectors) => {
		onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
	}

	const filterByDependencies = (options) => OntologiesDecorator.filterByDependencies(workup, options)

	useEffect(() => {
		workup.device ||
			onWorkupChange({ name: 'device', value: ontologieOptions.device[0]?.value })
		// eslint-disable-next-line
	}, [])

	return (
		<FormSection>
			<ButtonGroupToggle value={workup.mode} options={ontologieOptions.mode_usage}
				onChange={handleChangeAutomation} />
			{workup.action}
			{workup.class}
			<SelectFormGroup
				label={'Type'}
				options={OptionsDecorator.inclusiveOptions(currentType, filterByDependencies(ontologieOptions.type))}
				value={currentType}
				onChange={handleChangeType}
				tooltipName={currentType?.unavailable && 'selection_unavailable'}
			/>
			{workup.subtype}
			<SelectFormGroup
				key={"subtype" + currentSubtype}
				label={'Subtype'}
				options={OptionsDecorator.inclusiveOptions(currentSubtype, filterByDependencies(ontologieOptions.subtype))}
				value={currentSubtype}
				onChange={handleChangeSubType}
				tooltipName={currentSubtype?.unavailable && 'selection_unavailable'}
			/>
			<SelectFormGroup
				key={"detectors" + currentDetectors}
				label={"Detectors"}
				options={OptionsDecorator.inclusiveOptions(currentDetectors, filterByDependencies(ontologieOptions.detector))}
				value={currentDetectors}
				isMulti
				isClearable={false}
				onChange={handleChangeDetectors}
				tooltipName={currentDetectors?.find(det => det.unavailable) && 'selection_unavailable'}
			/>
			{workup.device}
			<SingleLineFormGroup label='Type'>
				<Select
					className="react-select--overwrite"
					classNamePrefix="react-select"
					options={ontologieOptions.device}
					selected={OptionsDecorator.inclusiveOptionForValue(workup.device, ontologieOptions.device)}
					// selected={OptionsDecorator.inclusiveOptionForValue(workup.device, filterByDependencies(ontologieOptions.device))}
					onChange={selected => onWorkupChange({ name: 'device', value: selected.value })}
				/>
			</SingleLineFormGroup>
		</FormSection>
	)
}

export default SpectroscopyForm
