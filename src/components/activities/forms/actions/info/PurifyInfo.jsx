import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'
import PurifyDecorator from '../../../../../decorators/PurifyDecorator'

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const PurifyInfo = ({ activity }) => {

	let infoTitle = ""
	let infoLines = []
	let workup = activity.workup
	let steps = workup["purify_steps"];

	const purifyOptions = useContext(SelectOptions).purify[workup.purify_type];

	const isCristallization = workup.purify_type === 'CRYSTALLIZATION'

	const addAutomationToTitle = () => {
		infoTitle += " " + OptionsDecorator.optionToLabel(workup.automation, purifyOptions.automation_modes);
	}

	const addStepsToTitle = () => {
		if (!isCristallization && steps) {
			infoTitle += steps.length + " Step";
			if (steps.length > 1) { infoTitle += "s"; }
		}
	}

	const addPurifySolventsToLines = () => {
		infoLines = infoLines.concat(PurifyDecorator.infoLinePurifySolvents(workup, purifyOptions.solvent_options))
	}

	switch (workup.purify_type) {
		case "CRYSTALLIZATION":
		case "CHROMATOGRAPHY":
			addStepsToTitle()
			addAutomationToTitle()
			addPurifySolventsToLines()
			break;
		case "EXTRACTION":
			addStepsToTitle()
			infoTitle += " " + workup.automation.toLowerCase() + ", Phase: " + workup.phase.toLowerCase();
			addPurifySolventsToLines()
			break;
		case "FILTRATION":
			addStepsToTitle()
			addAutomationToTitle()
			infoTitle += " Keep " + OptionsDecorator.optionToLabel(workup.filtration_mode, purifyOptions.modes
			);
			addPurifySolventsToLines()
			break;
		default:
			infoTitle = "Data Error: Unknown Purification Type # " + workup.purify_type + " #"
			break;
	}

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} description={workup.description} />
	)
}

export default PurifyInfo
