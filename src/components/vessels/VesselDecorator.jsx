import React from 'react'

import { apiHostname } from '../../Constants'

export default class VesselDecorator {

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

  static toLabel = (value) => {
    if (value) {
      const newStr = value.split('_')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
      return newStr;
    }
  }

  /* Render functions */

  static renderVesselLabel = (vessel) => {
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
        <div>{this.toLabel(vessel.vessel_type)}</div>
        <div>{this.renderVesselVolume(vessel)}</div>
        <div>{this.renderVesselMaterial(vessel)}</div>
        <div>{this.toLabel(vessel.environment_type)}</div>
      </>
    )
  }

  static renderVesselProcessStepInfo = (vessel) => {
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
    return (
      <>
        {vessel.volume_amount}
        {" " + this.toLabel(vessel.volume_unit)}
      </>
    )
  }

  static renderVesselMaterial = (vessel) => {
    return (
      <>
        {this.toLabel(vessel.material_type)}
      </>
    )
  }

  static renderVesselVolumeAndMaterial = (vessel) => {
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
