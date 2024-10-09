import React, { useState } from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DurationSelection from "../../formgroups/DurationSelection";
import MetricsInputFormGroup from "../../formgroups/MetricsInputFormGroup";
import OptionalFormSet from "../../formsets/OptionalFormSet";

import ActivityInfoDecorator from "../../../../../decorators/ActivityInfoDecorator";

const RemoveLimitsFormSet = ({ limits, onSave }) => {

  const emptyLimitsForm = {}

  const [limitsForm, setLimitsForm] = useState(limits || emptyLimitsForm);

  const resetForm = () => setLimitsForm(emptyLimitsForm)

  const handleSave = () => onSave(limitsForm)

  const handleCancel = () => { setLimitsForm(limits || emptyLimitsForm) }

  const onChangeLimit = (name) => (value) => {
    setLimitsForm({ ...limitsForm, [name]: value })
  }

  const limitsSummary = ActivityInfoDecorator.infoLineRemoveConditions(limits)

  return (
    <OptionalFormSet subFormLabel="Limits"
      valueSummary={limitsSummary}
      onSave={handleSave}
      onCancel={handleCancel}
      typeColor={'action'}
    >
      <OptionalFormSet.ExtraButton>
        <Button color="condition" onClick={resetForm} outline>
          <FontAwesomeIcon icon="undo-alt" /> Reset
        </Button>
      </OptionalFormSet.ExtraButton>

      <MetricsInputFormGroup
        metricName={"TEMPERATURE"}
        amount={limitsForm.TEMPERATURE}
        onChange={onChangeLimit('TEMPERATURE')}
      />
      <MetricsInputFormGroup
        metricName={"PRESSURE"}
        amount={limitsForm.PRESSURE}
        onChange={onChangeLimit('PRESSURE')}
      />
      <DurationSelection duration={limitsForm.duration} onChangeDuration={onChangeLimit('duration')} />
    </OptionalFormSet>
  );
};

export default RemoveLimitsFormSet;
