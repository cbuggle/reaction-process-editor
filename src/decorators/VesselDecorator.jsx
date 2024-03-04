import React from "react";

import { apiHostname } from "../constants";

import StringDecorator from "./StringDecorator";
import OptionsDecorator from "./OptionsDecorator";

export default class VesselDecorator {
  // TODO: renderVesselProcessStepInfo is the only function called from outside.
  // The functions actually in use are all marked. ("// called internally only ")
  //
  // I'm leaving all legacy code as reference for upcoming UI design :-)
  //
  // They should be deleted once Vessel UI design is finished.

  /* supporting functions */

  static getVesselById = (vesselId, vessels) => {
    return vessels.find((vessel) => vessel.id === vesselId);
  };

  static vesselId = (vessel) => {
    return vessel.id.substring(0, 4);
  };

  static vesselTitle = (vessel) => {
    return !!vessel
      ? StringDecorator.toLabelSpelling(vessel.vessel_type)
      : undefined;
  };

  static vesselIconAltText = (vessel) => {
    return "Vessel " + this.vesselTitle(vessel);
  };

  static vesselTabularData = (vesselData) => {
    return vesselData.map((vessel) => {
      return {
        id: vessel.id,
        name: vessel.name,
        template: vessel.vessel_template_name,
        type: vessel.vessel_type,
        material: vessel.material_type,
        volume: this.vesselVolume(vessel),
        environment: vessel.environment_type,
        bar_code: vessel.bar_code,
        qr_code: vessel.qr_code,
      };
    });
  };

  /* Render functions */

  static renderVesselLabel = (vessel) => {
    // called internally only
    return (
      <>
        <div>{this.renderVesselTypeIcon(vessel)}</div>
      </>
    );
  };

  static renderVesselDetails = (vessel) => {
    return (
      <>
        <div>{this.vesselTitle(vessel)}</div>
        <div>{this.vesselVolume(vessel)}</div>
        <div>{this.vesselMaterial(vessel)}</div>
        <div>{StringDecorator.toLabelSpelling(vessel.environment_type)}</div>
      </>
    );
  };

  static renderVesselProcessStepInfo = (vessel) => {
    // Called from StepVessel.jsx
    if (vessel) {
      return (
        <>
          {this.renderVesselLabel(vessel)}
          {this.vesselVolumeAndMaterial(vessel)}
        </>
      );
    } else {
      return (
        <>
          <div>No Vessel assigned</div>
        </>
      );
    }
  };

  static vesselSingleLine = (vessel) => {
    // Called from StepForm.jsx
    return vessel
      ? this.vesselTitle(vessel) + " " + this.vesselVolumeAndMaterial(vessel)
      : undefined;
  };

  static renderVesselTypeIcon = (vessel) => {
    return (
      <>
        <img
          alt={this.vesselIconAltText(vessel)}
          className="vessel-icon"
          src={`${apiHostname}/images/vessels/${vessel.vessel_type.toLowerCase()}.svg`}
        />
      </>
    );
  };

  static vesselVolume = (vessel) => {
    return vessel.volume_amount + " " + vessel.volume_unit.toLowerCase();
  };

  static vesselMaterial = (vessel) => {
    // called internally only
    return StringDecorator.toLabelSpelling(vessel.material_type);
  };

  static vesselVolumeAndMaterial = (vessel) => {
    // called internally only
    return this.vesselVolume(vessel) + " (" + this.vesselMaterial(vessel) + ")";
  };

  static vesselPreparationsLine = (preparations, preparationOptions) => {
    return OptionsDecorator.optionsArrayToLabel(
      preparations,
      preparationOptions
    );
  };
}
