import React, { useContext, useState } from "react";
import { Button, FormGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DurationSelection from "../../../../utilities/DurationSelection";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../../../utilities/OptionalFormSet";
import SolventListForm from "../../../../utilities/SolventListForm";

import PurifyDecorator from "../../../../../decorators/PurifyDecorator";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { SubFormController } from "../../../../../contexts/SubFormController";

const ExtractionStepForm = ({
  label,
  workup,
  onSave,
  onCancel,
  onDelete,
  canDelete,
  initialShowForm
}) => {
  const extractionOptions = useContext(SelectOptions).purify.EXTRACTION;
  const subFormController = useContext(SubFormController);

  const initialFormData = {
    duration: workup.duration || 0,
    solvents: workup.solvents || [],
    amount: workup.amount || { value: 0, unit: "ml" },
    flow_rate: workup.flow_rate || { value: undefined, unit: "MLMIN" }
  }

  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => setFormData(initialFormData)

  const handleChangeFormData = (key) => (value) => {
    setFormData((prevData) => {
      return { ...prevData, [key]: value }
    })
  }

  const handleCancel = () => {
    onCancel()
    resetForm()
  }
  const handleSave = () => {
    onSave(formData)
    resetForm()
  }

  const handleDelete = () => {
    subFormController.toggleSubForm(label);
    onDelete();
  };

  const summary = PurifyDecorator.infoLineSolventsWithRatio(formData)

  return (
    <OptionalFormSet
      subFormLabel={label}
      valueSummary={summary}
      onSave={handleSave}
      onCancel={handleCancel}
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
        solvents={formData.solvents}
        solventOptions={extractionOptions.solvent_options}
        setSolvents={handleChangeFormData('solvents')}
      />
      <FormGroup>
        <MetricsInput
          tooltipName={'purify_amount'}
          metricName={"VOLUME"}
          amount={formData.amount}
          onChange={handleChangeFormData('amount')}
        />
        <MetricsInput
          metricName={'VELOCITY'}
          amount={formData.flow_rate}
          onChange={handleChangeFormData('flow_Rate')}
        />
        <DurationSelection
          tooltipName={'purify_duration'}
          duration={formData.duration}
          onChangeDuration={handleChangeFormData('duration')}
        />
      </FormGroup>
    </OptionalFormSet>
  );
};

export default ExtractionStepForm;
