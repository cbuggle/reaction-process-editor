import React, { useContext, useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";

import ActivityInfoDecorator from "../../../../../decorators/ActivityInfoDecorator";
import DurationSelection from "../../../../utilities/DurationSelection";
import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../../../utilities/OptionalFormSet";
import SolventListForm from "./SolventListForm";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { SubFormController } from "../../../../../contexts/SubFormController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChromatographyStepForm = ({
  index,
  workup,
  onSave,
  onCancel,
  onDelete,
  canDelete,
  initialShowForm
}) => {
  const selectOptions = useContext(SelectOptions);
  const purifySolventOptions = selectOptions.materials["MODIFIER"];
  const subFormController = useContext(SubFormController);

  const label = "Chromatography Step " + (index + 1);
  const [duration, setDuration] = useState(workup?.duration || 0);
  const [solvents, setSolvents] = useState(workup ? workup.solvents : []);
  const [amount, setAmount] = useState(
    workup?.amount || { value: 0, unit: "ml" }
  );
  const [flowRate, setFlowRate] = useState(
    workup?.flow_rate || { value: undefined, unit: "MLMIN" }
  );

  const [stepMode, setStepMode] = useState(
    workup?.step_mode || selectOptions.purify.chromatography.step_modes[0].value
  );
  const [prodMode, setProdMode] = useState(
    workup?.prod_mode || selectOptions.purify.chromatography.prod_modes[0].value
  );

  const handleSave = () => {
    onSave({
      index,
      data: {
        solvents,
        amount,
        step_mode: stepMode,
        prod_mode: prodMode,
        flow_rate: flowRate,
      },
    });
  };

  const handleDelete = () => {
    subFormController.toggleSubForm(label);
    onDelete(index);
  };

  return (
    <OptionalFormSet
      subFormLabel={label}
      valueSummary={ActivityInfoDecorator.chromatographyStepInfo(
        {
          solvents,
          amount,
        },
        purifySolventOptions
      )}
      onSave={handleSave}
      onCancel={onCancel}
      typeColor="action"
      initialShowForm={initialShowForm}
    >
      {canDelete && (
        <OptionalFormSet.ExtraButton>
          <Button color="danger" onClick={handleDelete}>
            <FontAwesomeIcon icon="trash" />
          </Button>
        </OptionalFormSet.ExtraButton>
      )}
      <SolventListForm
        label={'Modifier'}
        solvents={solvents}
        solventOptions={purifySolventOptions}
        setSolvents={setSolvents}
      />
      <FormGroup>
        <MetricsInput
          tooltipName={'purify_amount'}
          metricName={"VOLUME"}
          amount={amount}
          onChange={setAmount}
        />
      </FormGroup>
      <FormGroup>
        <MetricsInput
          metricName={'VELOCITY'}
          amount={flowRate}
          onChange={setFlowRate}
        />
        <DurationSelection
          tooltipName={'purify_duration'}
          duration={duration}
          onChangeDuration={setDuration}
        />
        <Label>Step</Label>
        <ButtonGroupToggle
          value={stepMode}
          options={selectOptions.purify.chromatography.step_modes}
          onChange={(selectedValue) => setStepMode(selectedValue)}
        />
        <Label>Prod</Label>
        <ButtonGroupToggle
          value={prodMode}
          options={selectOptions.purify.chromatography.prod_modes}
          onChange={(selectedValue) => setProdMode(selectedValue)}
        />
      </FormGroup>
    </OptionalFormSet>
  );
};

export default ChromatographyStepForm;
