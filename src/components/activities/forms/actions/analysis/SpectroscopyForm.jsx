import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import FormSection from '../../../../utilities/FormSection'
import SingleLineFormGroup from '../../formgroups/SingleLineFormGroup'

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const SpectroscopyForm = ({ workup, onWorkupChange }) => {
	const selectOptions = useContext(SelectOptions).FORMS.ANALYSIS.SPECTROSCOPY

	useEffect(() => {
		workup.device ||
			onWorkupChange({ name: 'device', value: selectOptions.devices[0]?.value })
		// eslint-disable-next-line
	}, [])

	return (
		<FormSection>
			<SingleLineFormGroup label='Type'>
				<Select
					key={'device'}
					className="react-select--overwrite"
					classNamePrefix="react-select"
					name="device"
					options={selectOptions.devices}
					value={OptionsDecorator.optionForValue(workup.device, selectOptions.devices)}
					onChange={selected => onWorkupChange({ name: 'device', value: selected.value })}
				/>
			</SingleLineFormGroup>
		</FormSection>
	)
}

export default SpectroscopyForm
