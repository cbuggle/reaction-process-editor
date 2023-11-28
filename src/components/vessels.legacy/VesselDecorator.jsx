import React from 'react'

import { apiHostname } from '../../constants'
import StringDecorator from '../../decorators/StringDecorator'

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
        <div>{StringDecorator.toTitleCase(vessel.vessel_type)}</div>
        <div>{this.renderVesselVolume(vessel)}</div>
        <div>{this.renderVesselMaterial(vessel)}</div>
        <div>{StringDecorator.toTitleCase(vessel.environment_type)}</div>
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
        {" " + StringDecorator.toTitleCase(vessel.volume_unit)}
      </>
    )
  }

  static renderVesselMaterial = (vessel) => {
    return (
      <>
        {StringDecorator.toTitleCase(vessel.material_type)}
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
