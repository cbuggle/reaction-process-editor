import React, { useContext, useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import DurationSelection from "../../../../utilities/DurationSelection";
import MetricsInput from "../../../../utilities/MetricsInput";
import OptionalFormSet from "../../../../utilities/OptionalFormSet";
import SolventListForm from "../../../../utilities/SolventListForm";

import PurifyDecorator from "../../../../../decorators/PurifyDecorator";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { SubFormController } from "../../../../../contexts/SubFormController";

const MeasurementChromatographyStepForm = ({
  label,
  workup,
  onSave,
  onCancel,
  onDelete,
  canDelete,
  initialShowForm
}) => {
  const chromatographyOptions = useContext(SelectOptions).measurement.CHROMATOGRAPHY;
  const solventOptions = chromatographyOptions.solvent_options;
  const subFormController = useContext(SubFormController);

  const initialFormData = {
    duration: workup.duration || 0,
    solvents: workup.solvents || [],
    amount: workup.amount || { value: 0, unit: "ml" },
    flow_rate: workup.flow_rate || { value: undefined, unit: "MLMIN" },
    step_mode: workup.step_mode || chromatographyOptions.step_modes[0].value,
    prod_mode: workup.prod_mode || chromatographyOptions.prod_modes[0].value
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
  }

  const handleDelete = () => {
    subFormController.toggleSubForm(label);
    onDelete();
  };

  const summary = PurifyDecorator.infoLineSolventsWithRatio(formData)

  return (
    <>
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
          label={'Mobile Phase'}
          solvents={formData.solvents}
          solventOptions={solventOptions}
          setSolvents={handleChangeFormData('solvents')}
        />
        <FormGroup>
          <MetricsInput
            tooltipName={'purify_amount'}
            metricName={"VOLUME"}
            amount={formData.amount}
            onChange={handleChangeFormData('amount')}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInput
            metricName={'VELOCITY'}
            amount={formData.flow_rate}
            onChange={handleChangeFormData('flow_rate')}
          />
          <DurationSelection
            tooltipName={'purify_duration'}
            duration={formData.duration}
            onChangeDuration={handleChangeFormData('duration')}
          />
          <Label>Step</Label>
          <ButtonGroupToggle
            value={formData.step_mode}
            options={chromatographyOptions.step_modes}
            onChange={handleChangeFormData('step_mode')}
          />
          <Label>Prod</Label>
          <ButtonGroupToggle
            value={formData.prod_mode}
            options={chromatographyOptions.prod_modes}
            onChange={handleChangeFormData('prod_mode')}
          />
        </FormGroup>
      </OptionalFormSet>
    </>
  );
};

export default MeasurementChromatographyStepForm;
