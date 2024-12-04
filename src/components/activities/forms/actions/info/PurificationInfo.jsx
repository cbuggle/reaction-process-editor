import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'
import PurificationDecorator from '../../../../../decorators/PurificationDecorator'

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const PurificationInfo = ({ activity }) => {

	let infoTitle = ""
	let infoLines = []
	let workup = activity.workup
	let steps = workup["purification_steps"];

	const purificationOptions = useContext(SelectOptions).FORMS.PURIFICATION[workup.purification_type];
	const ontologies = useContext(SelectOptions).ontologies;

	const isCristallization = workup.purification_type === 'CRYSTALLIZATION'

	const addAutomationToTitle = () => {
		infoTitle += " "
		infoTitle += OptionsDecorator.valueToLabel(workup.mode, purificationOptions.automation_modes) ||
			OptionsDecorator.valueToLabel(workup.mode, ontologies)
	}

	const addStepsToTitle = () => {
		if (!isCristallization && steps) {
			infoTitle += steps.length + " Step";
			if (steps.length > 1) { infoTitle += "s"; }
		}
	}

	const addPurificationSolventsToLines = () => {
		infoLines = infoLines.concat(PurificationDecorator.infoLinePurificationSolvents(workup, purificationOptions.solvents))
	}

	switch (workup.purification_type) {
		case "CRYSTALLIZATION":
		case "CHROMATOGRAPHY":
			addStepsToTitle()
			addAutomationToTitle()
			addPurificationSolventsToLines()
			break;
		case "EXTRACTION":
			addStepsToTitle()
			infoTitle += " " + workup.automation.toLowerCase() + ", Phase: " + workup.phase.toLowerCase();
			addPurificationSolventsToLines()
			break;
		case "FILTRATION":
			addStepsToTitle()
			addAutomationToTitle()
			infoTitle += " Keep " + OptionsDecorator.valueToLabel(workup.filtration_mode, purificationOptions.modes
			);
			addPurificationSolventsToLines()
			break;
		default:
			infoTitle = "Error in PurificationInfo: Unknown type: " + workup.purification_type
			break;
	}

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} description={workup.description} />
	)
}

export default PurificationInfo
