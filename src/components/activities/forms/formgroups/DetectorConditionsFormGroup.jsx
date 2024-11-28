import React from 'react'

import MetricSubFormSet from '../formsets/MetricSubFormSet'
import TextInputFormSet from '../formsets/TextInputFormSet'
import WavelengthListFormSet from '../formsets/WavelengthListFormSet'

const DetectorConditionsFormGroup = ({ detectorsOptions, conditions, onChange, disabled }) => {

	const handleChangeDetectorValue = (detectorId, metricName) => (value) => {
		onChange({ ...conditions, [detectorId]: { ...conditions[detectorId], [metricName]: value } })
	}

	console.log("DetectorConditionsFormGroup")
	console.log(detectorsOptions)


	const renderDetectorInputs = (detector) => {
		let detectorId = detector.value

		return detector.analysis_defaults?.map(analysis_default => {
			let metricName = analysis_default.metric_name

			let label = '' + detector.label + ' ' + analysis_default.label
			let value = conditions?.[detectorId]?.[metricName]

			switch (analysis_default.data_type) {
				case 'TEXT':
					return (<TextInputFormSet
						key={"text" + analysis_default.label}
						label={label}
						value={value}
						onSave={handleChangeDetectorValue(detectorId, metricName)}
						typeColor='action'
						disabled={disabled}
					/>)
				case 'METRIC':
					return (<MetricSubFormSet
						label={label}
						metricName={analysis_default.metric_name}
						amount={value}
						onSave={handleChangeDetectorValue(detectorId, metricName)}
						disabled={disabled}
					/>)
				case 'WAVELENGTHLIST':
					return (<WavelengthListFormSet
						label={label}
						wavelengths={value}
						onChange={handleChangeDetectorValue(detectorId, metricName)}
						disabled={disabled}
					/>)
				default:
					return <>Error: Detector {detectorId} has unknown data type {analysis_default?.data_type}. Data corrupted?.</>
			}
		})
	}

	return (
		<>
			{detectorsOptions?.map(detector => renderDetectorInputs(detector))}
		</>
	)
}

export default DetectorConditionsFormGroup
