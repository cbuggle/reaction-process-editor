import React from "react";

import { UncontrolledTooltip, PopoverHeader, PopoverBody } from "reactstrap";

import SamplesDecorator from "../../decorators/SamplesDecorator";
import StringDecorator from "../../decorators/StringDecorator";
import MetricsDecorator from "../../decorators/MetricsDecorator";

const MaterialBox = ({ material }) => {
  const materialInfo = () => {
    const type =
      material.acts_as === "DIVERSE_SOLVENT"
        ? "Solvent"
        : StringDecorator.toLabelSpelling(material.acts_as || 'Transfer');
    const amount = MetricsDecorator.infoLineAmount(material.amount);
    return `${type}: ${material.label} (${amount})`;
  };

  return (
    <>
      <div id={"tooltip-sample-" + material.id} className="pt-1">
        {materialInfo()}
      </div>
      <UncontrolledTooltip
        placement="top"
        target={"tooltip-sample-" + material.id}
      >
        <PopoverHeader>{material.label}</PopoverHeader>
        {material.acts_as === "SAMPLE" && (
          <PopoverBody>
            <div>{SamplesDecorator.sampleSvgImg(material)}</div>
          </PopoverBody>
        )}
      </UncontrolledTooltip>
    </>
  );
};

export default MaterialBox;
