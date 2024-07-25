import React, { useState } from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DurationSelection from "../../../../utilities/DurationSelection";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../../../utilities/OptionalFormSet";

import ActivityInfoDecorator from "../../../../../decorators/ActivityInfoDecorator";

const RemoveLimitsFormSet = ({ limits, preconditions, onChange }) => {

  const emptyLimitsForm = {}

  const [limitsForm, setLimitsForm] = useState(limits || emptyLimitsForm);

  const resetForm = () => setLimitsForm(emptyLimitsForm)

  const handleSave = () => onChange(limitsForm)

  const handleCancel = () => { setLimitsForm(limits || emptyLimitsForm) }

  const changeLimit = (name) => (value) => {
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

      <MetricsInput
        metricName={"TEMPERATURE"}
        amount={limitsForm.TEMPERATURE}
        onChange={changeLimit('TEMPERATURE')}
      />
      <MetricsInput
        metricName={"PRESSURE"}
        amount={limitsForm.PRESSURE}
        onChange={changeLimit('PRESSURE')}
      />
      <DurationSelection duration={limitsForm.duration} onChangeDuration={changeLimit('duration')} />
    </OptionalFormSet>
  );
};

export default RemoveLimitsFormSet;
