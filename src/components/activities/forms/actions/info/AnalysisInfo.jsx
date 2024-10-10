import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';
import PurificationDecorator from '../../../../../decorators/PurificationDecorator';
import { SelectOptions } from '../../../../../contexts/SelectOptions';

const AnalysisInfo = ({ activity }) => {

	let infoTitle = ""
	let infoLines = []
	let workup = activity.workup
	let steps = workup["purification_steps"] || [];

	const purificationOptions = useContext(SelectOptions).FORMS.ANALYSIS[workup.analysis_type] || {};

	const addAutomationToTitle = () => {
		infoTitle += " " + OptionsDecorator.valueToLabel(workup.automation, purificationOptions.automation_modes);
	}

	const addStepsToTitle = () => {
		if (steps) {
			infoTitle += steps.length + " Step";
			if (steps.length > 1) { infoTitle += "s"; }
		}
	}

	const addPurificationSolventsToLines = () => {
		infoLines = infoLines.concat(PurificationDecorator.infoLinePurificationSolvents(workup, purificationOptions.solvent_options))
	}

	switch (workup.analysis_type) {
		case "CHROMATOGRAPHY":
			addStepsToTitle()
			addAutomationToTitle()
			addPurificationSolventsToLines()
			break;
		case "SPECTRONOMY":
			break;
		case "SPECTROSCOPY":
			break;
		default:
			infoTitle = "Error in PurificationInfo: Unknown type: " + workup.analysis_type
			break;
	}

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} description={workup.description} />
	)
}

export default AnalysisInfo
