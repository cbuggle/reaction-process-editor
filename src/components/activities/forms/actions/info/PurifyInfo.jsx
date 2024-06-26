import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'
import PurifyDecorator from '../../../../../decorators/PurifyDecorator'
import VesselDecorator from '../../../../../decorators/VesselDecorator'

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const PurifyInfo = ({ activity }) => {
	const selectOptions = useContext(SelectOptions);

	let infoTitle = ""
	let infoLines = []
	let workup = activity.workup

	if (workup.purify_type === "EXTRACTION") {
		infoTitle =
			"Automation: " + workup.automation.toLowerCase() +
			", Phase: " + workup.phase.toLowerCase();
		infoLines.push(
			"Solvent: " + PurifyDecorator.filtrationStepInfo(workup, selectOptions.materials["SOLVENT"])
		);
		infoLines.push(
			VesselDecorator.vesselSingleLine(activity.reaction_process_vessel?.vessel)
		);
	} else {
		const steps = workup["purify_steps"];
		infoTitle = "";
		if (steps) {
			infoTitle += steps.length + " Step";
			if (steps.length > 1) {
				infoTitle += "s";
			}
			infoTitle += " ";
		}
		// chromatograpy.automation_modes extends general automation_modes
		infoTitle += OptionsDecorator.optionToLabel(
			workup.automation,
			selectOptions.purify.chromatography.automation_modes
		);
		if (workup.filtration_mode) {
			infoTitle +=
				" Keep " +
				OptionsDecorator.optionToLabel(
					workup.filtration_mode,
					selectOptions.purify.filtration.modes
				);
		}
		if (steps && selectOptions.materials["SOLVENT"]) {
			for (let i = 0; i < steps.length; i++) {
				if (steps.length > 1) {
					infoLines.push("Step " + (i + 1));
				}
				infoLines.push(
					PurifyDecorator.filtrationStepInfo(
						steps[i],
						selectOptions.materials["SOLVENT"]
					)
				);
			}
		}
	}

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} description={workup.description} />
	)
}

export default PurifyInfo
