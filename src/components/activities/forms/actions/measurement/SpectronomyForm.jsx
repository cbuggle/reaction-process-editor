import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import FormSection from '../../../../utilities/FormSection'
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const SpectronomyForm = ({ workup, onWorkupChange }) => {
	const spectronomyOptions = useContext(SelectOptions).FORMS.MEASUREMENT.SPECTRONOMY


	useEffect(() => {
		workup.spectronomy_type ||
			onWorkupChange({ name: 'spectronomy_type', value: spectronomyOptions.spectronomy_types[0].value })
		// eslint-disable-next-line
	}, [])


	return (
		<FormSection>
			<SingleLineFormGroup label='Type'>
				<Select
					key={'spectronomy_type'}
					className="react-select--overwrite"
					classNamePrefix="react-select"
					name="spectronomy_type"
					options={spectronomyOptions.spectronomy_types}
					value={OptionsDecorator.optionForKey(workup.spectronomy_type, spectronomyOptions.spectronomy_types)}
					onChange={selected => onWorkupChange({ name: 'spectronomy_type', value: selected.value })}
				/>
			</SingleLineFormGroup>
		</FormSection>
	)
}

export default SpectronomyForm
