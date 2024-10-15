import React from 'react'

import MetricSubFormSet from '../formsets/MetricSubFormSet'
import TextInputFormSet from '../formsets/TextInputFormSet'
import WavelengthListFormSet from '../formsets/WavelengthListFormSet'

const DetectorConditionsFormGroup = ({ detectors, conditions, onChange, disabled }) => {

	const handleChangeDetectorValue = (detectorName, metricName) => (value) => {
		onChange({ ...conditions, [detectorName]: { ...conditions[detectorName], [metricName]: value } })
	}

	const renderDetectorInputs = (detector) => {

		let detectorName = detector.value

		return detector.analysis_types?.map(analysis_type => {
			let metricName = analysis_type.metric_name

			let label = '' + detectorName + ' ' + analysis_type.label
			let value = conditions?.[detectorName]?.[metricName]

			switch (analysis_type.data_type) {
				case 'TEXT':
					return (<TextInputFormSet
						key={"text" + analysis_type.label}
						label={label}
						value={value}
						onSave={handleChangeDetectorValue(detectorName, metricName)}
						typeColor='action'
						disabled={disabled}
					/>)
				case 'METRIC':
					return (<MetricSubFormSet
						label={label}
						metricName={analysis_type.metric_name}
						amount={value}
						onSave={handleChangeDetectorValue(detectorName, metricName)}
						disabled={disabled}
					/>)
				case 'WAVELENGTHLIST':
					return (<WavelengthListFormSet
						label={label}
						wavelengths={value}
						onChange={handleChangeDetectorValue(detectorName, metricName)}
						disabled={disabled}
					/>)
				default:
					return <>Error: Detector {detectorName} has unknown data type {analysis_type?.data_type}. Data corrupted?.</>
			}
		})
	}

	return (
		<>
			{detectors?.map(detector => renderDetectorInputs(detector))}
		</>
	)
}

export default DetectorConditionsFormGroup
