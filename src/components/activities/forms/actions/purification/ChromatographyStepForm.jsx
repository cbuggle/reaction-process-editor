import React, { useContext, useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ButtonGroupToggle from "../../formgroups/ButtonGroupToggle";
import DurationSelection from "../../formgroups/DurationSelection";
import MetricsInputFormGroup from "../../formgroups/MetricsInputFormGroup";
import OptionalFormSet from "../../formsets/OptionalFormSet";
import SolventListFormGroup from "../../formgroups/SolventListFormGroup";

import PurificationDecorator from "../../../../../decorators/PurificationDecorator";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { SubFormController } from "../../../../../contexts/SubFormController";

const ChromatographyStepForm = ({
  label,
  workup,
  onSave,
  onCancel,
  onDelete,
  canDelete,
  initialShowForm
}) => {
  const chromatographyOptions = useContext(SelectOptions).FORMS.PURIFICATION.CHROMATOGRAPHY;
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

  const summary = PurificationDecorator.infoLineSolventsWithRatio(formData)

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
        <SolventListFormGroup
          label={'Mobile Phase'}
          solvents={formData.solvents}
          solventOptions={chromatographyOptions.solvent_options}
          setSolvents={handleChangeFormData('solvents')}
        />
        <FormGroup>
          <MetricsInputFormGroup
            tooltipName={'purification_amount'}
            metricName={"VOLUME"}
            amount={formData.amount}
            onChange={handleChangeFormData('amount')}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInputFormGroup
            metricName={'VELOCITY'}
            amount={formData.flow_rate}
            onChange={handleChangeFormData('flow_rate')}
          />
          <DurationSelection
            tooltipName={'purification_duration'}
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

export default ChromatographyStepForm;
