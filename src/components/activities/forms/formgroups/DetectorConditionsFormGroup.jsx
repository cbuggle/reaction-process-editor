import React from 'react'

import MetricSubFormSet from '../formsets/MetricSubFormSet'
import TextInputFormSet from '../formsets/TextInputFormSet'
import WavelengthListFormSet from '../formsets/WavelengthListFormSet'

const DetectorConditionsFormGroup = ({ detectors, methodDetectors, conditions, onChange, disabled }) => {

	const handleChangeDefaults = (detectorDefaults) => (value) => {
		let analysis = detectorDefaults.analysis_type
		let detector = detectorDefaults.detector

		onChange({ ...conditions, [detector]: { ...conditions[detector], [analysis]: value } })
	}

	const renderDetectorInputs = (detectorAnalysisDefaults) => {

		return detectorAnalysisDefaults.map(detectorDefaults => {

			let value = conditions?.[detectorDefaults.detector]?.[detectorDefaults.analysis_type]
			switch (detectorDefaults?.data_type) {
				case 'TEXT':
					return (<TextInputFormSet
						key={"abc" + detectorDefaults.label}
						label={detectorDefaults.label}
						value={value}
						onSave={handleChangeDefaults(detectorDefaults)}
						typeColor='action'
						disabled={disabled}
					/>)
				case 'METRIC':
					return (<MetricSubFormSet
						label={detectorDefaults.label}
						metricName={detectorDefaults.analysis_type}
						amount={value}
						onSave={handleChangeDefaults(detectorDefaults)}
						disabled={disabled}
					/>)
				case 'WAVELENGTHLIST':
					return (<WavelengthListFormSet
						label={detectorDefaults.label}
						wavelengths={value}
						onChange={handleChangeDefaults(detectorDefaults)}
						disabled={disabled}
					/>)
				default:
					return <>Error: Detector has unknown data type {detectorDefaults?.data_type}. Data corrupted?.</>
			}
		})

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
