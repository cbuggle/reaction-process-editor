import React, { useState, useContext } from "react";
import { FormGroup } from "reactstrap";
import Select from "react-select";

import ButtonGroupToggle from "../../../utilities/ButtonGroupToggle";
import MetricsInput from "../../../utilities/MetricsInput";
import OptionalFormSet from "../../../utilities/OptionalFormSet";

import MetricsDecorator from "../../../../decorators/MetricsDecorator";
import OptionsDecorator from "../../../../decorators/OptionsDecorator";
import { SelectOptions } from "../../../../contexts/SelectOptions";

const MotionForm = ({
  label,
  valueSummary,
  findInitialValue,
  children,
  onSave,
}) => {
  const selectOptions = useContext(SelectOptions);
  const automationModeOptions = selectOptions.automation_modes;
  const motionTypeOptions = selectOptions.motion_types;

  const initialSpeed = () =>
    findInitialValue("speed", MetricsDecorator.defaultAmount("MOTION"));

  const initialMotionType = () =>
    findInitialValue("motion_type", motionTypeOptions[0].value);

  const initialMotionMode = () =>
    findInitialValue("motion_mode", automationModeOptions[1].value);

  const [speed, setSpeed] = useState(initialSpeed());
  const [motionType, setMotionType] = useState(initialMotionType());
  const [motionMode, setMotionMode] = useState(initialMotionMode());

  const resetFormData = () => {
    setSpeed(initialSpeed());
    setMotionType(initialMotionType());
    setMotionMode(initialMotionMode());
  };

  /* use for slider input
  const handleRpmSliderChange = (event) => {
    setValue(event.target.value)
  }*/

  const handleSave = () => {
    onSave({
      speed: speed,
      motion_type: motionType,
      motion_mode: motionMode,
    });
  };

  const handleCancel = () => resetFormData();

  return (
    <OptionalFormSet
      subFormLabel={label}
      valueSummary={valueSummary}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <div className="motion-form">
        <FormGroup>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="motion_type"
            options={motionTypeOptions}
            value={OptionsDecorator.optionForKey(motionType, motionTypeOptions)}
            onChange={(selectedOption) => setMotionType(selectedOption.value)}
          />
        </FormGroup>
        <ButtonGroupToggle
          options={automationModeOptions}
          value={motionMode}
          onChange={setMotionMode}
          activityType="condition"
          label="Automation"
        />
        {/* include slider */}
        <FormGroup>
          <MetricsInput
            metricName={"MOTION"}
            amount={speed}
            onChange={setSpeed}
          />
        </FormGroup>
        {children}
      </div>
    </OptionalFormSet>
  );
};

export default MotionForm;
