import React from 'react'

import MetricSubFormSet from '../formsets/MetricSubFormSet'
import TextInputFormSet from '../formsets/TextInputFormSet'
import WavelengthListFormSet from '../formsets/WavelengthListFormSet'

const DetectorConditionsFormGroup = ({ detectors, methodDetectors, conditions, onChange, disabled }) => {

	const handleWorkupChange = (detectorDefaults) => (value) => {
		let analysis = detectorDefaults.analysis_type
		let detector = detectorDefaults.detector

		onChange({ ...conditions, [detector]: { ...conditions[detector], [analysis]: value } })
	}

	const renderDetectorInputs = (detectorDefaults) => {
		let value = conditions?.[detectorDefaults.detector]?.[detectorDefaults.analysis_type]

		switch (detectorDefaults?.input_type) {
			case 'TEXT':
				return (<TextInputFormSet
					key={"abc" + detectorDefaults.label}
					label={detectorDefaults.label}
					value={value}
					onSave={handleWorkupChange(detectorDefaults)}
					typeColor='action'
					disabled={disabled}
				/>)
			case 'METRIC':
				return (<MetricSubFormSet
					label={detectorDefaults.label}
					metricName={detectorDefaults.analysis_type}
					amount={value}
					onSave={handleWorkupChange(detectorDefaults)}
					disabled={disabled}
				/>)
			case 'WAVELENGTHLIST':
				return (<WavelengthListFormSet
					label={detectorDefaults.label}
					wavelengths={value}
					onChange={handleWorkupChange(detectorDefaults)}
					disabled={disabled}
				/>)
			default:
				return <>Detector {detectorDefaults?.input_type} can not be set</>
		}
	}

	return (
		<>
			{methodDetectors && methodDetectors
				.filter(option => detectors.map(d => d.value).includes(option.value))
				.map(methodDetector => renderDetectorInputs(methodDetector.analysis_defaults))}
		</>
	)
}

export default DetectorConditionsFormGroup
