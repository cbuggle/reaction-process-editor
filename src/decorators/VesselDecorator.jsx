import React from 'react'

import { apiHostname } from '../constants'

import StringDecorator from './StringDecorator'
export default class VesselDecorator {

	// TODO: renderVesselProcessStepInfo is the only function called from outside.
	// The functions actually in use are all marked. ("// called internally only ")
  //
	// I'm leaving all legacy code as reference for upcoming UI design :-)
	//
	// They should be deleted once Vessel UI design is finished.

	/* supporting functions */

	static vesselId = (vessel) => {
		return vessel.id.substring(0, 4)
	}

	static vesselIconName = (vessel) => {
		return vessel.vessel_type.toLowerCase();
	}

	static vesselIconAltText = (vessel) => {
		return "Vessel " + this.vesselIconName(vessel)
	}

	/* Render functions */

	static renderVesselLabel = (vessel) => {
		// called internally only
		return (
			<>
				<div>
					{this.renderVesselTypeIcon(vessel)}
				</div>
			</>
		)
	}

	static renderVesselDetails = (vessel) => {
		return (
			<>
				<div>{StringDecorator.toLabelSpelling(vessel.vessel_type)}</div>
				<div>{this.renderVesselVolume(vessel)}</div>
				<div>{this.renderVesselMaterial(vessel)}</div>
				<div>{StringDecorator.toLabelSpelling(vessel.environment_type)}</div>
			</>
		)
	}

	static renderVesselProcessStepInfo = (vessel) => {
		// Called from StepVessel.jsx
		if (vessel) {
			return (
				<>
					{this.renderVesselLabel(vessel)}
					{this.renderVesselVolumeAndMaterial(vessel)}
				</>
			)
		} else {
			return (
				<>
					<div>No Vessel assigned</div>
				</>
			)
		}
	}

	static renderVesselTypeIcon = (vessel) => {
		return (
			<>
				<img alt={this.vesselIconAltText(vessel)} className="vessel-icon" src={`${apiHostname}/images/vessels/${this.vesselIconName(vessel)}.svg`} />
			</>
		)
	}

	static renderVesselVolume = (vessel) => {
		// called internally only
		return (
			<>
				{vessel.volume_amount}
				{" " + StringDecorator.toLabelSpelling(vessel.volume_unit)}
			</>
		)
	}

	static renderVesselMaterial = (vessel) => {
		// called internally only
		return (
			<>
				{StringDecorator.toLabelSpelling(vessel.material_type)}
			</>
		)
	}

	static renderVesselVolumeAndMaterial = (vessel) => {
		// called internally only
		return (
			<div>
				{this.renderVesselVolume(vessel)}
				{" ("}
				{this.renderVesselMaterial(vessel)}
				)
			</div>
		)

	}
}
