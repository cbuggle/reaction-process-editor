import React from "react";

import { UncontrolledTooltip, PopoverHeader, PopoverBody } from "reactstrap";

import SamplesDecorator from "../../../decorators/SamplesDecorator";
import StringDecorator from "../../../decorators/StringDecorator";

const SampleBox = ({ material }) => {
  return (
    <>
      <div id={"tooltip-sample-" + material.id} className="pt-1">
        {StringDecorator.toLabelSpelling(material.acts_as)}: {material.label} (
        {material.amount.value} {material.amount.unit})
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

export default SampleBox;
