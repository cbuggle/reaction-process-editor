import React, { useContext, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ActivityInfoDecorator from "../../../../../decorators/ActivityInfoDecorator";
import DurationSelection from "../../../../utilities/DurationSelection";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../../../utilities/OptionalFormSet";
import SolventListForm from "./SolventListForm";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { SubFormController } from "../../../../../contexts/SubFormController";

const FiltrationStepForm = ({
  index,
  workup,
  onSave,
  onCancel,
  onDelete,
  canDelete,
  initialShowForm
}) => {
  const selectOptions = useContext(SelectOptions);
  const purifySolventOptions = selectOptions.materials["SOLVENT"];
  const subFormController = useContext(SubFormController);

  const label = "Filtration Step " + (index + 1);
  const [duration, setDuration] = useState(workup?.duration || 0);
  const [solvents, setSolvents] = useState(workup?.solvents || []);
  const [rinse, setRinse] = useState(workup?.rinse_vessel || false);
  const [amount, setAmount] = useState(
    workup?.amount || { value: 0, unit: "ml" }
  );
  const [repetitions, setRepetitions] = useState(
    workup?.repetitions || { value: 1, unit: "TIMES" }
  );

  const handleRinseCheckBox = (event) => setRinse(event.target.checked);

  const handleSave = () => {
    onSave({
      index,
      data: {
        solvents,
        amount,
        repetitions,
        rinse_vessel: rinse,
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
      valueSummary={ActivityInfoDecorator.filtrationStepInfo(
        {
          solvents,
          amount,
          repetitions,
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
        solvents={solvents}
        solventOptions={purifySolventOptions}
        setSolvents={setSolvents}
      />
      <FormGroup>
        <MetricsInput
          tooltipName={'purification_amount'}
          metricName={"VOLUME"}
          amount={amount}
          onChange={setAmount}
        />
        <MetricsInput
          metricName={"REPETITIONS"}
          onChange={setRepetitions}
          amount={repetitions}
        />
        <DurationSelection
          tooltipName={'purification_duration'}
          duration={duration}
          onChangeDuration={setDuration}
        />
        <FormGroup check className="mb-3">
          <Label check>
            <Input
              type="checkbox"
              checked={rinse}
              onChange={handleRinseCheckBox}
            />
            Rinse Vessel
          </Label>
        </FormGroup>
      </FormGroup>
    </OptionalFormSet>
  );
};

export default FiltrationStepForm;
