import React from "react";
import { FormGroup } from "reactstrap";

import OptionalFormSet from "../formsets/OptionalFormSet";

import EquipmentSubsetForm from "./EquipmentSubsetForm";

const EquipmentForm = ({
  metricName,
  equipment,
  isEqualToPredefinedValue,
  valueSummary,
  onChangeEquipment,
  onSave,
  onCancel,
}) => {
  return (
    <OptionalFormSet
      subFormLabel={"Equipment"}
      valueSummary={valueSummary}
      isEqualToPredefinedValue={isEqualToPredefinedValue}
      onCancel={onCancel}
      onSave={onSave}
    >
      <FormGroup>
        <EquipmentSubsetForm
          metricName={metricName}
          equipment={equipment}
          onChangeEquipment={onChangeEquipment}
        />
      </FormGroup>
    </OptionalFormSet>
  );
};

export default EquipmentForm;
