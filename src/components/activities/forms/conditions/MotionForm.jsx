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
  const motionOptions = useContext(SelectOptions).FORMS.MOTION;

  const initialSpeed = () =>
    findInitialValue("speed", MetricsDecorator.defaultAmount("MOTION"));

  const initialMotionType = () =>
    findInitialValue("motion_type", motionOptions.types[0].value);

  const initialMotionMode = () =>
    findInitialValue("motion_mode", motionOptions.automation_modes[1].value);

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
      speed: displayRpmInput() ? speed : undefined,
      motion_type: motionType,
      motion_mode: motionMode,
    });
  };

  const handleCancel = () => resetFormData();

  const displayRpmInput = () => motionMode !== 'MANUAL'

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
            options={motionOptions.motion_types}
            value={OptionsDecorator.optionForKey(motionType, motionOptions.motion_types)}
            onChange={(selectedOption) => setMotionType(selectedOption.value)}
          />
        </FormGroup>
        <ButtonGroupToggle
          options={motionOptions.automation_modes}
          value={motionMode}
          onChange={setMotionMode}
          activityType="condition"
          label="Automation"
        />
        {displayRpmInput() &&
          <FormGroup>
            <MetricsInput
              metricName={"MOTION"}
              amount={speed}
              onChange={setSpeed}
            />
          </FormGroup>
        }
        {children}
      </div>
    </OptionalFormSet>
  );
};

export default MotionForm;
