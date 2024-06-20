import React, { useContext, useState } from "react";
import { Button, FormGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ActivityInfoDecorator from "../../../../../decorators/ActivityInfoDecorator";
import DurationSelection from "../../../../utilities/DurationSelection";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../../../utilities/OptionalFormSet";
import SolventListForm from "./SolventListForm";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { SubFormController } from "../../../../../contexts/SubFormController";

const ExtractionStepForm = ({
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

  const label = "Extraction Step " + (index + 1);
  const [duration, setDuration] = useState(workup?.duration || 0);
  const [solvents, setSolvents] = useState(workup?.solvents || []);

  const [amount, setAmount] = useState(
    workup?.amount || { value: 0, unit: "ml" }
  );

  const [flowRate, setFlowRate] = useState(
    workup?.flow_rate || { value: undefined, unit: "MLMIN" }
  );


  const handleSave = () => {
    onSave({
      index,
      data: {
        solvents,
        amount,
        flow_rate: flowRate,
        duration: duration,
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
          tooltipName={'purify_amount'}
          metricName={"VOLUME"}
          amount={amount}
          onChange={setAmount}
        />
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
      </FormGroup>
    </OptionalFormSet>
  );
};

export default ExtractionStepForm;
