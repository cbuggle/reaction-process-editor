import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import FormSection from '../../../../utilities/FormSection'
import SingleLineFormGroup from '../../formgroups/SingleLineFormGroup'

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const SpectroscopyForm = ({ workup, onWorkupChange }) => {
	const selectOptions = useContext(SelectOptions).FORMS.ANALYSIS.SPECTROSCOPY

	useEffect(() => {
		workup.spectroscopy_type ||
			onWorkupChange({ name: 'spectroscopy_type', value: selectOptions.spectroscopy_types[0].value })
		// eslint-disable-next-line
	}, [])


	return (
		<FormSection>
			<SingleLineFormGroup label='Type'>
				<Select
					key={'spectroscopy_type'}
					className="react-select--overwrite"
					classNamePrefix="react-select"
					name="spectroscopy_type"
					options={selectOptions.spectroscopy_types}
					value={OptionsDecorator.optionForValue(workup.spectroscopy_type, selectOptions.spectroscopy_types)}
					onChange={selected => onWorkupChange({ name: 'spectroscopy_type', value: selected.value })}
				/>
			</SingleLineFormGroup>
		</FormSection>
	)
}

export default SpectroscopyForm
