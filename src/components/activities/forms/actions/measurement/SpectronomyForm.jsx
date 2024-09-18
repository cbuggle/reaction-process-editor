import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import FormSection from '../../../../utilities/FormSection'
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'

import { SelectOptions } from '../../../../../contexts/SelectOptions';

const SpectronomyForm = ({ workup, onWorkupChange }) => {
	const selectOptions = useContext(SelectOptions).measurement.SPECTRONOMY


	useEffect(() => {
		workup.spectronomy_type ||
			onWorkupChange({ name: 'spectronomy_type', value: selectOptions.spectronomy_types[0].value })
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
					options={selectOptions.spectronomy_types}
					value={OptionsDecorator.optionForKey(workup.spectronomy_type, selectOptions.spectronomy_types)}
					onChange={selected => onWorkupChange({ name: 'spectronomy_type', value: selected.value })}
				/>
			</SingleLineFormGroup>
		</FormSection>
	)
}

export default SpectronomyForm
